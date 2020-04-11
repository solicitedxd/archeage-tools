import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import IfPerm from 'components/IfPerm';
import Link from 'components/Link';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { getDay } from 'utils/schedule';
import { hhmmssFromDate } from 'utils/thunderstruck';

// to prevent import org from removing the import
moment_tz;

class EventCard extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    icon: string.isRequired,
    eventType: number.isRequired,
    gameTime: bool,
    timer: object,
    activeTime: object,
    nextTime: object,
    link: string,
    onEdit: func.isRequired,
  };

  static defaultProps = {
    gameTime: false,
    timer: moment(),
    activeTime: {},
    nextTime: {},
    link: null,
  };

  render() {
    const { id, name, icon, link, timer, activeTime, nextTime, onEdit } = this.props;
    const tz = moment.tz.guess();
    const running = Boolean(activeTime);
    let upcoming = 'Unknown';
    let label = 'Upcoming';
    let nextDay = null;
    let displayName = `${name}${nextTime.name ? `: ${nextTime.name}` : ''}`;

    if (nextTime.startTime) {
      const upcomingTime = nextTime.startTime.tz(tz);
      if (nextTime.days.length > 0 && nextTime.days.length < 7) {
        nextDay = getDay(upcomingTime.day());
      }
      const format = (upcomingTime.day() !== moment().day()) ? 'ddd h:mm A' : 'h:mm A';
      upcoming = upcomingTime.format(format);
    }

    if (running) {
      label = 'Next';
      if (activeTime.name) {
        upcoming = `${nextTime.name} at ${upcoming}`;
        displayName = `${name}${activeTime.name ? `: ${activeTime.name}` : ''}`;
      }
    }

    if (nextTime.gameTime) {
      upcoming += ` [${nextTime.gameTime.substr(0, 5)}]`;
    }

    const remainingTime = timer.diff(moment.utc().milliseconds(0));
    const remaining = (remainingTime >= 0) ? hhmmssFromDate(remainingTime) : '';

    return (
      <Card square className="event-card">
        <CardHeader
          className={cn({ running })}
          avatar={
            <div style={{ position: 'relative' }}>
              {nextDay && <Tooltip title={nextDay}>
                <div className={`ev-day day-${nextDay}`} />
              </Tooltip>}
              <Avatar aria-label={name} src={`/images/event/${icon}.png`} className="event-icon" />
            </div>
          }
          title={link ? <Link to={link}>{displayName}</Link> : displayName}
          subheader={`${label}: ${upcoming}`}
          action={
            <div className="ev-status">
              <div className="ev-status-wrapper">
                {running && <div className="ev-status-in-progress" />}
                <Typography variant="caption">
                  {remaining}
                </Typography>
              </div>
              <div className="ev-btn">
                <IfPerm permission="event.edit">
                  <IconButton size="small" onClick={onEdit(true, id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </IfPerm>
                <Tooltip title="See more times">
                  <IconButton size="small">
                    <ExpandMoreIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          }
        />
      </Card>
    );
  }
}

export default EventCard;
