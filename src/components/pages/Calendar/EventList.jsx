import React, { Component } from 'react';
import { string, bool } from 'react-proptypes';
import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { EVENT_TYPE } from 'constants/calendar';
import {
  GAME_TIME_EVENTS,
  REAL_TIME_EVENTS,
} from 'data/calendar';
import EventCard from './EventCard';

class EventList extends Component {
  static propTypes = {
    type: string.isRequired,
    regionNA: bool,
  };

  static defaultProps = {
    regionNA: true,
  };

  state = {};

  render() {
    const { type, regionNA } = this.props;

    let events = [];
    switch (type) {
      case EVENT_TYPE.REAL_TIME_EVENT:
        events = REAL_TIME_EVENTS.filter(event => event.type === type);
        break;
      case EVENT_TYPE.GAME_TIME_EVENT:
        events = GAME_TIME_EVENTS;
        break;
      case EVENT_TYPE.WORLD_BOSSES:
        events = REAL_TIME_EVENTS.filter(event => event.type === type);
        break;
      default:
    }

    return (
      <Paper className="event-list">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{type}</Typography>
          </Toolbar>
        </AppBar>
        {events.map(event => <EventCard {...event} key={event.name} regionNA={regionNA} />)}
      </Paper>
    );
  }
}

export default EventList;
