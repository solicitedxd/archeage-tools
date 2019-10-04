import React, { Component } from 'react';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import cn from 'classnames';
import {
  Controller,
  Scene,
} from 'react-scrollmagic';
import dailyQuests from 'data/dailies';
import Quest from './Quest';

class Dailies extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    width: window.innerWidth,
  };

  componentDidMount() {
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
      <div className="quest-container">
        <Paper className={cn('section', 'quest-list')} style={mainStyle}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className="title-text">Dailies Checklist</Typography>
              {this.showSettingsMenu() &&
              <IconButton color="inherit" aria-label="Menu" className="icon-button">
                <Settings />
              </IconButton>}
            </Toolbar>
          </AppBar>
          {dailyQuests.map((quest) => <Quest key={`${quest.name}${quest.idx && `-${quest.idx}`}`} {...quest} />)}
        </Paper>
        {!this.showSettingsMenu() &&
        <Controller>
          <Scene duration={300} pin enabled>
            <Paper className={cn('section', 'quest-filters')} style={{ width: '20%', minWidth: '200px' }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="subtitle1">Config and Rewards</Typography>
                </Toolbar>
              </AppBar>
            </Paper>
          </Scene>
        </Controller>}
      </div>
    );
  }
}

export default Dailies;
