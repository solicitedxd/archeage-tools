import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ToggleOff,
  ToggleOn,
} from '@material-ui/icons';
import { setRegion } from 'actions/calendar';
import cn from 'classnames';
import { EVENT_TYPE } from 'constants/schedule';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import React, { Component } from 'react';
import {
  bool,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { setTitle } from 'utils/string';
import CargoShip from './CargoShip';
import EventList from './EventList';

// prevent optimize imports from removing
moment_tz;

class Schedule extends Component {
  static propTypes = {
    mobile: bool,
    regionNA: bool,
    cargoShip: object,
  };

  static defaultProps = {
    mobile: false,
  };

  render() {
    const { mobile, regionNA, setRegion } = this.props;

    setTitle('Event Schedule');

    return (
      <div className="calendar-container tool-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Event Schedule
                [{moment.tz(moment.tz.guess()).format('z')}]</Typography>
              <Typography variant="overline">
                NA
                <Tooltip title="Toggle Regional Times">
                  <IconButton color="inherit" aria-label="Reset" onClick={() => setRegion(!regionNA)}>
                    {regionNA ? <ToggleOff /> : <ToggleOn />}
                  </IconButton>
                </Tooltip>
                EU
              </Typography>
            </Toolbar>
          </AppBar>
        </Paper>
        <div className={cn('section', 'calendar-categories', { mobile })}>
          <EventList type={EVENT_TYPE.REAL_TIME_EVENT} regionNA={regionNA} />
          <EventList type={EVENT_TYPE.WORLD_BOSSES} regionNA={regionNA} />
          <div className="event-list">
            <EventList type={EVENT_TYPE.GAME_TIME_EVENT} regionNA={regionNA} embed />
            <CargoShip />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calendar: { time, completed, regionNA }, display: { mobile } }) => ({
  time,
  completed,
  regionNA,
  mobile,
});

const mapDispatchToProps = {
  setRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
