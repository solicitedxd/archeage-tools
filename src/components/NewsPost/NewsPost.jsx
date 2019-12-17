import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import { string } from 'react-proptypes';

class NewsPost extends Component {
  static propTypes = {
    title: string.isRequired,
    date: string.isRequired,
  };

  render() {
    const { title, date, children } = this.props;

    return (
      <Paper className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h5" className="title-text">{title}</Typography>
            <Typography variant="overline">{date}</Typography>
          </Toolbar>
        </AppBar>
        <Typography component="div" className="body-container">
          {children}
        </Typography>
      </Paper>
    );
  }
}

export default NewsPost;
