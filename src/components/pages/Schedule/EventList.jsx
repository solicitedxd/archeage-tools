import {
  AppBar,
  Icon,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import { TYPE_ICON } from 'constants/schedule';
import React, { Component } from 'react';
import {
  array,
  number,
  string,
} from 'react-proptypes';
import EventCard from './EventCard';

class EventList extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    color: string.isRequired,
    events: array.isRequired,
  };

  static defaultProps = {};

  state = {
    times: {},
  };

  setTime = (event, time) => {
    const oldTimes = this.state.times;
    const times = { ...oldTimes, [event]: time };

    this.setState({ times });
  };

  sortEvents = (a, b) => {
    const { times } = this.state;
    const timeA = times[a.name];
    const timeB = times[b.name];

    // times not loaded yet
    if (!timeA || !timeB) return 0;

    let startTimeA = timeA.next.time;
    let startTimeB = timeB.next.time;

    if (timeA.running || timeB.running) {
      if (timeA.running && !timeB.running) {
        return -1;
      }
      if (!timeA.running && timeB.running) {
        return 1;
      }

      startTimeA = timeA.running.ends || timeA.running.time;
      startTimeB = timeB.running.ends || timeB.running.time;
    }

    return startTimeA - startTimeB;
  };

  render() {
    const { id, name, color, events } = this.props;

    return (
      <Paper className="event-list">
        <AppBar position="static">
          <Toolbar variant="dense">
            <div className={cn('event-bar', color)} />
            <Icon><img src={TYPE_ICON(id)} alt={name} /></Icon>
            <Typography className="title-text">{name}</Typography>
          </Toolbar>
        </AppBar>
        {events
        .sort(this.sortEvents)
        .map(event => (
          <EventCard
            {...event}
            key={event.name}
            regionNA={true}
            onUpdateTime={this.setTime}
            type={id}
          />),
        )}
      </Paper>
    );
  }
}

export default EventList;
