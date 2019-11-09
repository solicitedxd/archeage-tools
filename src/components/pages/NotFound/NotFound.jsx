import React, { Component } from 'react';
import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { setTitle } from 'utils/string';
import Link from 'components/Link';

class NotFound extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    setTitle('Not Found');
    return (
      <div className="calendar-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Not Found</Typography>
            </Toolbar>
          </AppBar>
          <div className="body-container">
            <Typography variant="body1">
              The page you were looking for could not be found.
            </Typography>
            <Typography variant="subtitle2">
              <Link to="/" color="primary">
                Return to Home
              </Link>
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

export default NotFound;
