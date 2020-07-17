import {
  AppBar,
  Icon,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import {
  array,
  func,
  number,
  string,
} from 'react-proptypes';
import EventCard from './EventCard';

class EventList extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    icon: string,
    color: string.isRequired,
    events: array.isRequired,
    onEdit: func.isRequired,
    region: string.isRequired,
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

  render() {
    const { id, name, icon, color, events, onEdit, region } = this.props;

    return (
      <Paper className="event-list">
        <AppBar position="static" className={color}>
          <Toolbar variant="dense">
            <Icon><img src={`/images/event_type/${icon}.png`} alt={name} /></Icon>
            <Typography className="title-text">{name}</Typography>
          </Toolbar>
        </AppBar>
        {events
        .map(event => (
          <EventCard
            {...event}
            key={event.name}
            onUpdateTime={this.setTime}
            type={id}
            onEdit={onEdit}
            region={region}
          />),
        )}
      </Paper>
    );
  }
}

export default EventList;
