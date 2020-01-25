import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';

class FolioHeader extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return (
      <AppBar position="static" className="section">
        <Toolbar variant="dense">
          <Typography variant="h4" className="title-text">Folio</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default FolioHeader;
