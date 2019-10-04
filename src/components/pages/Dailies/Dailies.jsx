import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Replay,
  Settings,
} from '@material-ui/icons';
import { resetQuests } from 'actions/dailies';
import cn from 'classnames';
import {
  Controller,
  Scene,
} from 'react-scrollmagic';
import dailyQuests from 'data/dailies';
import Quest from './Quest';
import Filters from './Filters';
import {
  CONTINENT,
  TYPE,
} from 'constants/dailies';
import { getQuestId } from 'utils/string';

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
    const { continents, faction, rewards, types, hideComplete, resetQuests, quests } = this.props;
    const zonesFromContinents = [].concat.apply([], continents.map(continent => Object.values(CONTINENT).find((ct) => ct.name === continent).zones));
    const mainStyle = this.showSettingsMenu() ? { width: '100%' } : { width: '80%', minWidth: '280px' };

    const visibleQuests = dailyQuests.filter(quest => {
      // do not show completed quests
      if (hideComplete && quests[getQuestId(quest)]) {
        return false;
      }

      // quest has faction AND faction doesn't match, hide
      if (quest.faction && quest.faction !== faction) {
        return false;
      }

      // continent is selected and quest zone not in
      if (zonesFromContinents.length > 0 && !zonesFromContinents.some(zone => quest.zones.includes(zone))) {
        return false;
      }

      // rewards selected and reward doesn't contain it
      if (rewards.length > 0 && !rewards.some(reward => quest.rewards.map(rw => rw.type).includes(reward))) {
        return false;
      }

      return !(types.length > 0 && ((quest.type && !types.includes(quest.type)) || (!quest.type && !types.includes(TYPE.OTHER))));
    });

    // calculate the available and gained rewards
    const availableRewards = [];
    const claimedRewards = [];
    visibleQuests.forEach(quest => {
      const completed = quests[getQuestId(quest)] || false;
      // TODO create lists of rewards
    });

    return (
      <div className="quest-container">
        <Paper className={cn('section', 'quest-list')} style={mainStyle}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className="title-text">Daily Quest Checklist</Typography>
              {this.showSettingsMenu() &&
              <IconButton color="inherit" aria-label="Menu">
                <Settings />
              </IconButton>}
              <Tooltip title="Reset all quests.">
                <IconButton color="inherit" aria-label="Reset" onClick={() => resetQuests()}>
                  <Replay />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {visibleQuests.map((quest) => <Quest key={getQuestId(quest)} {...quest} />)}
        </Paper>
        {!this.showSettingsMenu() &&
        <Controller>
          <Scene duration={300} pin enabled>
            <Paper className={cn('section', 'quest-filters')} style={{ width: '20%', minWidth: '200px' }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="subtitle1" className="title-text">Filters</Typography>
                </Toolbar>
              </AppBar>
              <Filters />
            </Paper>
          </Scene>
        </Controller>}
      </div>
    );
  }
}

const mapStateToProps = ({ dailies: { continents, faction, rewards, types, hideComplete, quests } }) => ({
  continents,
  faction,
  rewards,
  types,
  hideComplete,
  quests,
});

const mapDispatchToProps = {
  resetQuests,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dailies);
