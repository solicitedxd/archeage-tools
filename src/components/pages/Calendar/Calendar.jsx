import React, { Component } from 'react';
import { bool } from 'react-proptypes';
import { connect } from 'react-redux';
import cn from 'classnames';
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
import moment from 'moment';
import moment_tz from 'moment-timezone';
import { setRegion } from 'actions/calendar';
import { EVENT_TYPE } from 'constants/calendar';
import EventList from './EventList';

// prevent optimize imports from removing
moment_tz;

class Calendar extends Component {
  static propTypes = {
    mobile: bool,
    regionNA: bool,
  };

  static defaultProps = {
    mobile: false,
  };

  render() {
    const { mobile, regionNA, setRegion } = this.props;

    return (
      <div className="calendar-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Event Calendar [{moment.tz(moment.tz.guess()).format('z')}]</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
