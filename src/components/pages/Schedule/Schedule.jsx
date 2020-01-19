import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { setRegion } from 'actions/calendar';
import cn from 'classnames';
import { EVENT_TYPE } from 'constants/schedule';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import React, { Component } from 'react';
import { bool } from 'react-proptypes';
import { connect } from 'react-redux';
import { setTitle } from 'utils/string';
import EventList from './EventList';

// prevent optimize imports from removing
moment_tz;

class Schedule extends Component {
  static propTypes = {
    mobile: bool,
    regionNA: bool,
  };

  static defaultProps = {
    mobile: false,
  };

  render() {
    const { mobile, regionNA, setRegion } = this.props;

    setTitle('Event Schedule');

    return (
      <div className="calendar-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Event Schedule
                [{moment.tz(moment.tz.guess()).format('z')}]</Typography>
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
        <div className={cn('section', 'calendar-categories', { mobile })}>
          {Object.values(EVENT_TYPE).map(type => <EventList key={type} type={type} regionNA={regionNA} />)}
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
