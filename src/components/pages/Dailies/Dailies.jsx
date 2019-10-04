import React, { Component } from 'react';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import dailyQuests from 'data/dailies';
import Quest from './Quest';

class Dailies extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    width: window.innerWidth,
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  showSettingsMenu = () => {
    const { width } = this.state;
    return (width < 540);
  };

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const mainStyle = this.showSettingsMenu() ? { width: '100%' } : { width: '80%', minWidth: '280px' };

    return (
      <div style={{ display: 'flex' }}>
        <Paper className="section" style={mainStyle}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className="title-text">Dailies Checklist</Typography>
              {this.showSettingsMenu() &&
              <IconButton color="inherit" aria-label="Menu" className="icon-button">
                <Settings />
              </IconButton>}
            </Toolbar>
          </AppBar>
          {dailyQuests.map((quest) => <Quest key={quest.name} {...quest} />)}
        </Paper>
        {!this.showSettingsMenu() &&
        <Paper className="section" style={{ width: '20%', minWidth: '200px' }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1">Config and Rewards</Typography>
            </Toolbar>
          </AppBar>
        </Paper>}
      </div>
    );
  }
}

export default Dailies;
