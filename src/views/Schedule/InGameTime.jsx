import {
  AppBar,
  Icon,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { Component } from 'react';
import { bool } from 'react-proptypes';

const OFFSET_HOUR = 2;
const OFFSET_MINUTE = 20;

class InGameTime extends Component {
  static propTypes = {
    mobile: bool,
  };

  static defaultProps = {
    mobile: false,
  };

  state = {
    time: '00:00',
  };

  interval = null;

  componentDidMount() {
    this.doTick();
    this.interval = setInterval(this.doTick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  doTick = () => {
    const now = moment.utc().milliseconds(0).subtract(OFFSET_HOUR, 'hours').subtract(OFFSET_MINUTE, 'minutes');
    const seconds = (now.hours() * 60 * 60) + (now.minute() * 60) + now.seconds();
    // 4 hour cycles
    const gameTime = seconds % (4 * 60 * 60);
    const hour = String(Math.floor(gameTime / 600)).padStart(2, '0');
    const minute = String(Math.floor((gameTime % 600) / 10)).padStart(2, '0');
    this.setState({ time: `${hour}:${minute}` });
  };

  render() {
    const { mobile } = this.props;
    const { time } = this.state;

    if (mobile) {
      return (
        <Paper className="event-list">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Icon>
                <div className="clock-icon" />
              </Icon>
              <Typography>In-Game Time: {time}</Typography>
            </Toolbar>
          </AppBar>
        </Paper>
      );
    }

    return (
      <Typography>
        <Tooltip title={
          <>
            <Typography>In-Game Time</Typography>
            <Typography variant="caption" component="p">In-Game Time estimation is approximate. All servers may vary
              by a minute or so.</Typography>
            <Typography variant="caption" component="p">Each in-game hour spans 10 minutes of real-life time, with a
              full in-game day occurring in 4 hours of real-life time.</Typography>
            <Typography variant="caption" component="p">Events and bosses spawn at the specified time, but may be
              completed or killed by other players before the timer&apos;s in-progress duration is over.</Typography>
          </>
        }>
          <span>
            <span className="clock-icon" />
            {time}
          </span>
        </Tooltip>
      </Typography>
    );
  }
}

export default InGameTime;
