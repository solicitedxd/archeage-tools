import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'components/Link';
import React from 'react';
import { setTitle } from 'utils/string';

const NotFound = () => {
  setTitle('Not Found');
  return (
    <>
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
    </>
  );
};

export default NotFound;
