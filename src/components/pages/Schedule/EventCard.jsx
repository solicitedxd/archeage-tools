import {
  Avatar,
  Card,
  CardHeader,
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import Link from 'components/Link';
import { EVENT_TYPE } from 'constants/schedule';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
  oneOfType,
  string,
} from 'react-proptypes';
import { getDay } from 'utils/calendar';
import { hhmmssFromDate } from 'utils/thunderstruck';

// to prevent import org from removing the import
moment_tz;

class EventCard extends Component {
  static propTypes = {
    icon: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    link: string,
    days: object,
    times: oneOfType([object, array]),
    regionNA: bool,
    onUpdateTime: func.isRequired,
  };

  static defaultProps = {
    days: {},
    times: {},
    regionNA: true,
    link: null,
  };

  state = {
    times: [],
    days: [],
    nextOccurrence: {},
    running: null,
    regionNA: true,
    time: 0,
  };

  timer = null;

  componentDidMount() {
    this.timer = setInterval(this.handleTick, 250);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTimes = () => {
    const { regionNA, times: timesRaw, days: daysRaw } = this.props;
    let times = [];
    if (timesRaw) {
      if (Array.isArray(timesRaw)) {
        times = [...timesRaw];
      } else {
        times = timesRaw[regionNA ? 'NA' : 'EU'] || [];
      }
    }
    if (times.length === 0) {
      this.setState({ nextOccurrence: {}, running: null, time: 0 });
      return {};
    }
    const days = daysRaw && daysRaw[regionNA ? 'NA' : 'EU'] || [];
    return { times, days };
  };

  createEventTime = (days, daysRaw) => (time, yesterday) => {
    const now = moment.utc().milliseconds(0);
    const { name, inGameTime } = time;

    let running = null;

    if (time.days) {
      days = time.days;
    } else {
      days = daysRaw;
    }
    const [hh, mm, ss] = time.time.split(':');
    const startTime = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
    if (yesterday === true) {
      startTime.subtract(1, 'day');
    }
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
    if (!startTime.isAfter(now) && endTime && endTime.isAfter(now)) {
      running = { ...time, time: moment(startTime) };
      if (endTime) {
        running.ends = moment(endTime);
      }
    }
    // move the start time forward for events that have already started
    while (!startTime.isAfter(now)) {
      startTime.add(1, 'day');
      endTime && endTime.add(1, 'day');
    }
    // now that the day has been progressed, move the day forward to an appropriate day
    while (days.length > 0 && !days.includes(getDay(startTime.day()))) {
      startTime.add(1, 'day');
      endTime && endTime.add(1, 'day');
    }

    return { ...time, time: startTime, ends: endTime, name, inGameTime, running };
  };

  toInt = (time) => {
    const [hh, mm, ss] = time.time.split(':');
    return hh + (mm / 60) + (ss / (60 * 60));
  };

  getNextOccurrence = () => {
    const { times: timesRaw, days: daysRaw } = this.getTimes();
    if (!timesRaw) return;
    let days = daysRaw;

    const createTime = this.createEventTime(days, daysRaw);
    const times = timesRaw.map(createTime);

    const lastTime = timesRaw.sort((a, b) => this.toInt(a) - this.toInt(b))[timesRaw.length - 1];
    times.push(createTime(lastTime, true));
    const running = (times.find(t => t.running !== null) || {}).running;

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
      time = times.sort((a, b) => a.time > b.time ? 1 : -1)[0];
    }

    if (time) {
      nextOccurrence.time = time.time;
      nextOccurrence.ends = time.ends;
      nextOccurrence.day = (days.length >= 1);
      nextOccurrence.name = time.name || null;
      nextOccurrence.runningName = times.length > 1 ? times[times.length - 1].name : null;
      nextOccurrence.inGameTime = time.inGameTime;
    }

    this.props.onUpdateTime(this.props.name, { next: nextOccurrence, running });
    this.setState({ nextOccurrence, running });
  };

  handleTick = () => {
    const { nextOccurrence, running, regionNA: regionPrev } = this.state;
    const { regionNA } = this.props;

    // prevent state update upon unload
    if (this.timer === null) return;

    const today = moment.utc();
    let time = 0;

    if (running) {
      time = running.ends.diff(today);
    } else if (nextOccurrence.time) {
      time = nextOccurrence.time.diff(today);
    }

    this.setState({ time: time, regionNA }, () => {
      if (time <= 0 || regionPrev !== regionNA) {
        this.getNextOccurrence();
      }
    });
  };

  render() {
    const { icon, name, inGameTime, type, link } = this.props;
    let { nextOccurrence, running, time: remainingTime } = this.state;
    const tz = moment.tz.guess();
    let upcoming = 'Unknown';
    let label = 'Upcoming';
    let nextDay = null;
    let displayName = `${name}${nextOccurrence.name ? `: ${nextOccurrence.name}` : ''}`;

    if (nextOccurrence.time) {
      const upcomingTime = nextOccurrence.time.tz(tz);
      if (nextOccurrence.day) {
        nextDay = getDay(upcomingTime.day());
      }
      const format = (upcomingTime.day() !== moment().day()) ? 'ddd h:mm A' : 'h:mm A';
      upcoming = upcomingTime.format(format);
    }

    if (running) {
      label = 'Next';
      if (nextOccurrence.runningName) {
        upcoming = `${nextOccurrence.name} at ${upcoming}`;
        displayName = `${name}${nextOccurrence.runningName ? `: ${nextOccurrence.runningName}` : ''}`;
      }
    }

    if (type === EVENT_TYPE.GAME_TIME_EVENT) {
      if (running && nextOccurrence.runningName) {
        upcoming = `${nextOccurrence.name} at ${nextOccurrence.inGameTime || inGameTime}`;
        label = 'Next';
      } else {
        upcoming = nextOccurrence.inGameTime || inGameTime;
        label = 'In-Game Time';
      }
    }

    const remaining = (remainingTime > 0) ? hhmmssFromDate(remainingTime) : '';

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
          title={link ? <Link to={link}>{displayName}</Link> : displayName}
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
