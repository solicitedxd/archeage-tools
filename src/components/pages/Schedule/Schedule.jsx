import {
  AppBar,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  fetchEvents,
  fetchEventTypes,
} from 'actions/gameData';
import {
  clearAlerts,
  setRegion,
} from 'actions/schedule';
import EnchantResult from 'audio/enchant_result.mp3';
import QuestAccept2 from 'audio/quest_accept_2.mp3';
import cn from 'classnames';
import IfPerm from 'components/IfPerm';
import debounce from 'lodash.debounce';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { objectHasProperties } from 'utils/object';
import {
  getDayKey,
  hhmmssToInt,
} from 'utils/schedule';
import { deepCopy } from 'utils/skills';
import { setTitle } from 'utils/string';
import EditEvent from './EditEvent';
import EventList from './EventList';
import InGameTime from './InGameTime';

// prevent optimize imports from removing
moment_tz;

class Schedule extends Component {
  static propTypes = {
    regionNA: bool,
    clearAlerts: func.isRequired,
    hasAlerts: bool,
  };

  static defaultProps = {
    regionNA: true,
    hasAlerts: false,
  };

  state = {
    events: [],
    width: 0,
    editOpen: false,
    editId: null,
    showDisabled: false,
  };

  reminderAlert = new Audio(EnchantResult);
  startingAlert = new Audio(QuestAccept2);

  ref = React.createRef();

  interval = null;

  componentDidMount() {
    const { fetchEventTypes, fetchEvents, events, regionNA } = this.props;
    fetchEventTypes();
    fetchEvents();

    if (objectHasProperties(events)) {
      this.setupEvents(events, regionNA);
    }

    window.addEventListener('resize', this._handleResize);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { events, regionNA } = nextProps;

    if (!equals(events, this.props.events) || regionNA !== this.props.regionNA) {
      this.setupEvents(events, regionNA);
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    window.removeEventListener('resize', this._handleResize);
  }

  setupEvents = (events, regionNA) => {
    this.handleResize();
    events = Object.values(events);
    if (!this.state.showDisabled) {
      events = events.filter(e => !e.disabled);
    }
    events = events.map(this.calculateNextStart(regionNA));
    events.sort(this.sortEvents);
    this.setState({ events }, () => {
      if (!this.interval) {
        this.interval = setInterval(this.doTick, 1000);
        this.doTick();
      }
    });
  };

  calculateNextStart = (regionNA) => (event) => {
    const region = regionNA ? 'NA' : 'EU';
    const now = moment.utc().milliseconds(0);
    let { times } = event;
    let activeTime = null;
    let nextTime = {};

    // skip if there are no times
    if (!times) return;

    // only look through one region's times
    times = times.filter(time => !time.region || time.region === (region)).sort((a, b) => hhmmssToInt(a.time) - hhmmssToInt(b.time));
    if (times.length > 0) {
      // duplicate the last occurrence to yesterday
      const lastTime = deepCopy(times[times.length - 1]);
      lastTime.yesterday = true;
      const firstTime = deepCopy(times[0]);
      firstTime.tomorrow = true;

      times.unshift(lastTime);
      // also duplicate the first time to the end
      times.push(firstTime);
    }

    // loop through times until we get to the time that starts
    times.forEach(occurrence => {
      const { days, time, duration, yesterday, tomorrow } = occurrence;

      // create the start time from 00:00:00 format
      const [hh, mm, ss] = time.split(':');
      const startTime = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);

      // modify yesterday/tomorrow times
      if (yesterday === true) {
        startTime.subtract(1, 'day');
      }
      if (tomorrow === true) {
        startTime.add(1, 'day');
      }

      // create the end time by adding a duration from 00:00:00 format to start time
      const endTime = moment(startTime);
      if (duration) {
        const [hh, mm, ss] = duration.split(':');
        endTime.add(hh, 'hours').add(mm, 'minutes').add(ss, 'seconds');
      }

      // if the event only starts on specific days, we need to move it to that day first
      while (days.length > 0 && !days.includes(getDayKey(startTime.day()))) {
        // subtract days for yesterday occurrences
        startTime.add(yesterday ? -1 : 1, 'day');
        endTime.add(yesterday ? -1 : 1, 'day');
      }

      // add times to object
      occurrence.startTime = startTime;
      occurrence.endTime = endTime;

      // check if an event is active right now
      if (startTime.isSameOrBefore(now) && endTime.isAfter(now)) {
        // event is active
        activeTime = occurrence;
      }

      // times are sorted, so find the next occurrence that is after right now as the next time
      if (startTime.isAfter(now) && (!nextTime.startTime || nextTime.startTime.isAfter(startTime))) {
        nextTime = occurrence;
      }
    });

    if (activeTime) {
      event.timer = activeTime.endTime;
    } else {
      event.timer = nextTime.startTime;
    }

    event.activeTime = activeTime;
    event.nextTime = nextTime;

    return event;
  };

  sortEvents = (a, b) => {
    if (a.activeTime || b.activeTime) {
      if (a.activeTime && !b.activeTime) {
        return -1;
      }
      if (!a.activeTime && b.activeTime) {
        return 1;
      }
    }
    return a.timer.diff(b.timer);
  };

  doTick = () => {
    const { events } = this.state;
    const now = moment.utc().milliseconds(0);

    let sort = false;

    events.forEach((event, i) => {
      if (event.timer && now.isSameOrAfter(event.timer)) {
        events[i] = this.calculateNextStart(this.props.regionNA)(event);
        sort = true;
      }
    });

    // this.reminderAlert.play();

    if (sort) {
      events.sort(this.sortEvents);
    }

    this.setState({ events, now });
  };

  handleResize = () => {
    const { width } = this.ref.current.getBoundingClientRect();
    this.setState({ width });
  };

  _handleResize = debounce(this.handleResize, 100);

  setEditOpen = (editOpen, editId) => () => {
    this.setState({ editOpen, editId });
  };

  setShowDisabled = (showDisabled) => () => {
    const { events, regionNA } = this.props;

    this.setState({ showDisabled }, () => this.setupEvents(events, regionNA));
  };

  render() {
    const { regionNA, setRegion, eventTypes, mobile, hasAlerts, clearAlerts } = this.props;
    const { events, width, editOpen, editId, showDisabled } = this.state;

    // max cols = 3
    // min cols = 1
    // min col size = 350
    const cols = Math.max(Math.min(Math.floor(width / 350), 3), 1);
    const colWidth = Math.round(10000 / cols) / 100;

    setTitle('Event Schedule');

    return (
      <div className="schedule-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography className="title-text">
                {moment.tz(moment.tz.guess()).format('z')} Schedule
              </Typography>
              {!mobile && <InGameTime mobile={mobile} />}
              <Typography variant="overline" className="region-opt">
                NA
                <Tooltip title="Toggle Regional Times">
                  <IconButton color="inherit" aria-label="Reset" onClick={() => setRegion(!regionNA)}>
                    {regionNA ? <ToggleOffIcon /> : <ToggleOnIcon />}
                  </IconButton>
                </Tooltip>
                EU
              </Typography>
              <Tooltip title="Clear all alerts">
                <span>
                  <IconButton disabled={!hasAlerts} onClick={clearAlerts}>
                    <NotificationsOffIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <IfPerm permission="event.edit">
                <>
                  <Tooltip title={showDisabled ? 'Hide Disabled' : 'Show Disabled'}>
                    <IconButton onClick={this.setShowDisabled(!showDisabled)} color="inherit">
                      {showDisabled ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add new event">
                    <IconButton onClick={this.setEditOpen(true, null)} color="inherit">
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </>
              </IfPerm>
            </Toolbar>
          </AppBar>
        </Paper>
        <div className={cn('section', 'schedule-categories')} ref={this.ref}>
          {!objectHasProperties(eventTypes) &&
          <CircularProgress size={64} color="primary" style={{ width: 'center' }} />}
          {Array.from(Array(cols)).map((_, col) => (
            <div className="schedule-column" style={{ width: `${colWidth}%` }} key={`event-col-${col}`}>
              {col === 0 && mobile && <InGameTime mobile={mobile} />}
              {Object.values(eventTypes)
              .filter((type, i) => (i + (mobile ? 1 : (cols === 2 && i > 1 && i < 4 ? 1 : 0))) % cols === col)
              .map(type => (
                <EventList
                  key={`event-list-${type.id}`}
                  {...type}
                  events={events.filter(e => e.eventType === type.id)}
                  onEdit={this.setEditOpen}
                  region={regionNA ? 'NA' : 'EU'}
                />
              ))}
            </div>
          ))}
        </div>
        <EditEvent
          onClose={this.setEditOpen(false, null)}
          open={editOpen}
          id={editId}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ calendar: { regionNA, alerts }, gameData: { events, eventTypes }, display: { mobile } }) => ({
  regionNA,
  mobile,
  events,
  eventTypes,
  hasAlerts: objectHasProperties(alerts),
});

const mapDispatchToProps = {
  setRegion,
  fetchEventTypes,
  fetchEvents,
  clearAlerts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
