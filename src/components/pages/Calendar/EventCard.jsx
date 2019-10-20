import React, { Component } from 'react';
import {
  bool,
  object,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import {
  Avatar,
  Card,
  CardHeader,
  Tooltip,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import { EVENT_TYPE } from 'constants/calendar';
import { getDay } from 'utils/calendar';

// to prevent import org from removing the import
moment_tz;

class EventCard extends Component {
  static propTypes = {
    icon: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    days: object,
    times: object,
    regionNA: bool,
  };

  static defaultProps = {
    days: {},
    times: {},
    regionNA: true,
  };

  state = {
    times: [],
    days: [],
    nextOccurrence: {},
    running: null,
    regionNA: true,
    time: 0,
  };

  timer;

  componentDidMount() {
    this.setupTimer(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { regionNA } = this.props;
    const { regionNA: nRegionNA } = nextProps;
    if (regionNA !== nRegionNA) {
      this.setupTimer(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setupTimer = (props) => {
    const { regionNA, times: timesRaw, days: daysRaw, type } = props;
    // do nothing for game time events
    if (type === EVENT_TYPE.GAME_TIME_EVENT) return;

    const times = timesRaw && timesRaw[regionNA ? 'NA' : 'EU'] || [];
    if (times.length === 0) {
      this.setState({ nextOccurrence: {}, running: null, time: 0 });
      clearInterval(this.timer);
      return;
    }
    const days = daysRaw && daysRaw[regionNA ? 'NA' : 'EU'] || [];

    this.setState({ times, days }, () => {
      this.getNextOccurrence();
      this.timer = setInterval(this.handleTick, 1000);
    });
  };

  getNextOccurrence = () => {
    const { times: timesRaw, days } = this.state;

    const now = moment.utc();
    let running = null;
    const times = timesRaw.map(time => {
      const [hh, mm, ss] = time.time.split(':');
      const startTime = moment.utc().hour(hh).minute(mm).second(ss);
      let endTime;
      if (time.duration) {
        const [hh2, mm2, ss2] = time.duration.split(':');
        endTime = moment(startTime);
        endTime.add(hh2, 'hours');
        endTime.add(mm2, 'minutes');
        endTime.add(ss2, 'seconds');
      }
      // if the event only starts on specific days, we need to move it to that day first
      while (days.length > 0 && !days.includes(getDay(startTime.day()))) {
        startTime.add(1, 'day');
        endTime && endTime.add(1, 'day');
      }
      // check if the event is running, if so, we want to show a running timer
      if (startTime.isBefore(now) && endTime && endTime.isAfter(now)) {
        running = { ...time, time: moment(startTime) };
        if (endTime) {
          running.ends = moment(endTime);
        }
      }
      // move the start time forward for events that have already started
      while (startTime.isBefore(now)) {
        startTime.add(1, 'day');
        endTime && endTime.add(1, 'day');
      }
      // now that the day has been progressed, move the day forward to an appropriate day
      while (days.length > 0 && !days.includes(getDay(startTime.day()))) {
        startTime.add(1, 'day');
        endTime && endTime.add(1, 'day');
      }
      return { ...time, time: startTime, ends: endTime };
    });

    const nextOccurrence = {
      time: null,
      ends: null,
      duration: null,
      day: null,
    };

    let time;

    if (times.length === 1) {
      time = times[0];
    } else if (times.length > 1) {
      time = times.sort((a, b) => a.time > b.time)[0];
    }

    if (time) {
      nextOccurrence.time = time.time;
      nextOccurrence.ends = time.ends;
      nextOccurrence.duration = times.duration || null;
      nextOccurrence.day = (days.length >= 1);
    }

    this.setState({ nextOccurrence, running }, () => this.handleTick());
  };

  handleTick = () => {
    const { nextOccurrence, running } = this.state;

    // prevent state update upon unload
    if (this.timer === null) return;

    const today = moment.utc();
    let time = 0;

    if (running) {
      time = running.ends.diff(today);
    } else
    if (nextOccurrence.time) {
      time = nextOccurrence.time.diff(today);
    }

    this.setState({ time: time }, () => {
      if (time <= 0) {
        this.getNextOccurrence();
      }
    });
  };

  render() {
    const { icon, name, time, type } = this.props;
    let { nextOccurrence, running, time: remainingTime } = this.state;
    const tz = moment.tz.guess();
    let upcoming = 'Unknown';
    let upcomingTime;
    let label = 'Upcoming';
    let nextDay = null;

    if (type === EVENT_TYPE.GAME_TIME_EVENT) {
      upcoming = time;
      label = 'In-Game Time';
    } else if (nextOccurrence.time) {
      upcomingTime = nextOccurrence.time.tz(tz);
      if (nextOccurrence.day) {
        nextDay = getDay(upcomingTime.day());
      }
      const format = (upcomingTime.day() !== moment().day()) ? 'ddd h:mm A' : 'h:mm A';
      upcoming = upcomingTime.format(format);
    }

    if (running) {
      label = 'Next';
    }

    let remaining = "";
    if (remainingTime > 0) {
      const timeMatch = new Date(remainingTime).toUTCString().match(/, (\d\d).+(\d\d:\d\d:\d\d)/);
      const days = parseInt(timeMatch[1]) - 1;
      const time = timeMatch[2];
      remaining = `${days > 0 ? `${days}:` : ''}${time}`;
    }

    return (
      <Card>
        <CardHeader
          className={cn('event-card', { running: Boolean(running) })}
          avatar={
            <div style={{ position: 'relative' }}>
              {nextDay && <Tooltip title={nextDay}>
                <div className={`ev-day day-${nextDay}`} />
              </Tooltip>}
              <Avatar aria-label={name} src={icon} className="event-icon" />
            </div>
          }
          title={name}
          subheader={`${label}: ${upcoming}`}
          action={
            <div className="ev-status">
              {running && <div className={`ev-status-in-progress`} />}
              <Typography variant="caption">
                {remaining}
              </Typography>
            </div>
          }
        />
      </Card>
    );
  }
}

export default EventCard;
