import {
  AppBar,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import {
  fetchEvents,
  fetchEventTypes,
} from 'actions/gameData';
import { setRegion } from 'actions/schedule';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import { equals } from 'ramda';
import React, { Component } from 'react';
import { bool } from 'react-proptypes';
import { connect } from 'react-redux';
import { arrayToMap } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { getDayKey } from 'utils/schedule';
import { deepCopy } from 'utils/skills';
import { setTitle } from 'utils/string';
import EventList from './EventList';
import InGameTime from './InGameTime';

// prevent optimize imports from removing
moment_tz;

class Schedule extends Component {
  static propTypes = {
    regionNA: bool,
  };

  static defaultProps = {
    regionNA: true,
  };

  state = {
    events: [],
    width: 0,
  };

  ref = React.createRef();

  interval = null;

  componentDidMount() {
    const { fetchEventTypes, fetchEvents, events, eventTypes } = this.props;
    fetchEventTypes();
    fetchEvents();

    if (objectHasProperties(events)) {
      this.setupEvents(events, eventTypes);
    }

    window.addEventListener('resize', this._handleResize);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { events } = nextProps;

    if (!equals(events, this.props.events)) {
      this.setupEvents(events);
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    window.removeEventListener('resize', this._handleResize);
  }

  setupEvents = (events) => {
    this.handleResize();
    events = Object.values(events).filter(e => !e.disabled).map(this.calculateNextStart);
    this.setState({ events: arrayToMap(events) }, () => {
      this.interval = setInterval(this.doTick, 1000);
      this.doTick();
    });
  };

  calculateNextStart = (event) => {
    const { regionNA } = this.props;
    const region = regionNA ? 'NA' : 'EU';
    const now = moment.utc().milliseconds(0);
    let { times } = event;
    let activeTime = null;
    let nextTime = {};
    // only look through one region's times
    times = times.filter(time => time.region === (region)).sort((a, b) => this.toInt(a) - this.toInt(b));
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
    times.some(occurrence => {
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
      if (startTime.isAfter(now)) {
        nextTime = occurrence;
        return true;
      }

      return false;
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

  toInt = (time) => {
    const [hh, mm, ss] = time.time.split(':');
    return hh + (mm / 60) + (ss / (60 * 60));
  };

  doTick = () => {
    const { events } = this.state;
    const now = moment.utc().milliseconds(0);

    Object.entries(events).map(([key, event]) => {
      if (event.timer && now.isSameOrAfter(event.timer)) {
        events[key] = this.calculateNextStart(event);
      }
      return event;
    });

    this.setState({ events, now });
  };

  handleResize = () => {
    const { width } = this.ref.current.getBoundingClientRect();
    this.setState({ width });
  };

  _handleResize = debounce(this.handleResize, 100);

  render() {
    const { regionNA, setRegion, eventTypes, mobile } = this.props;
    const { events, width } = this.state;

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
              {!mobile &&
              <InGameTime mobile={mobile} />}
              <Typography variant="overline">
                NA
                <Tooltip title="Toggle Regional Times">
                  <IconButton color="inherit" aria-label="Reset" onClick={() => setRegion(!regionNA)}>
                    {regionNA ? <ToggleOffIcon /> : <ToggleOnIcon />}
                  </IconButton>
                </Tooltip>
                EU
              </Typography>
            </Toolbar>
          </AppBar>
        </Paper>
        <div className={cn('section', 'schedule-categories')} ref={this.ref}>
          {!objectHasProperties(eventTypes) &&
          <CircularProgress size={64} color="primary" style={{ width: 'center' }} />}
          {Array.from(Array(cols)).map((_, col) => (
            <div className="schedule-column" style={{ width: `${colWidth}%` }} key={`event-col-${col}`}>
              {col === 0 && mobile && <InGameTime mobile={mobile} />}
              {Object.values(eventTypes).filter((type, i) => (i + (mobile ? 1 : 0)) % cols === col).map(type => (
                <EventList
                  key={`event-list-${type.id}`}
                  {...type}
                  events={Object.values(events).filter(e => e.eventType === type.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calendar: { regionNA }, gameData: { events, eventTypes }, display: { mobile } }) => ({
  regionNA,
  mobile,
  events,
  eventTypes,
});

const mapDispatchToProps = {
  setRegion,
  fetchEventTypes,
  fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
