import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core';
import {
  Close,
  ExpandLess,
  Replay,
  Settings,
  Visibility,
} from '@material-ui/icons';
import {
  resetHide,
  resetQuests,
} from 'actions/dailies';
import dailyQuests from 'data/dailies';
import Quest from './Quest';
import Filters from './Filters';
import {
  CONTINENT,
  REWARD,
  TYPE,
} from 'constants/dailies';
import ITEM from 'data/items';
import {
  getQuestId,
  getZones,
} from 'utils/dailies';
import { setTitle } from 'utils/string';

class Dailies extends Component {
  state = {
    filtersOpen: false,
    scrollY: 0,
  };

  handleWindowScroll = () => {
    this.setState({ scrollY: document.documentElement.scrollTop });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  showSettingsMenu = () => {
    return this.props.displayMobile;
  };

  handleClose = () => {
    this.setState({ filtersOpen: false });
  };

  handleOpen = () => {
    this.setState({ filtersOpen: true });
  };

  handleReset = () => {
    const { resetQuests, resetHide, hideMode } = this.props;
    if (hideMode) {
      resetHide();
    } else {
      resetQuests();
    }
  };

  render() {
    const { continents, faction, rewards, types, hideComplete, quests, hideMode, hiddenQuests } = this.props;
    const { filtersOpen, scrollY } = this.state;
    const zonesFromContinents = [].concat.apply([], continents.map(continent => Object.values(CONTINENT).find((ct) => ct.name === continent).zones));
    const mainStyle = this.showSettingsMenu() ? { width: '100%' } : { width: '80%', minWidth: '280px' };

    // calculate the available and gained rewards
    // noinspection JSMismatchedCollectionQueryUpdate
    const availableRewards = [];
    // noinspection JSMismatchedCollectionQueryUpdate
    const claimedRewards = [];

    const visibleQuests = dailyQuests.filter(quest => {
      const completed = quests[getQuestId(quest)] || false;
      const hidden = hiddenQuests && hiddenQuests[getQuestId(quest)] || false;
      let visible = true;

      if (!hideMode && hidden) {
        return false;
      }

      // quest has faction AND faction doesn't match, hide
      if (quest.faction && quest.faction !== faction) {
        visible = false;
      }

      // continent is selected and quest zone not in
      const zones = getZones(quest.zones, faction);
      if (visible && zonesFromContinents.length > 0 && !zonesFromContinents.some(zone => zones.includes(zone))) {
        visible = false;
      }

      // rewards selected and reward doesn't contain it
      if (visible && rewards.length > 0 && !rewards.some(reward => quest.rewards.map(rw => rw.type).includes(reward))) {
        visible = false;
      }

      if (visible && types.length > 0 && ((quest.type && !types.includes(quest.type)) || (!quest.type && !types.includes(TYPE.OTHER)))) {
        visible = false;
      }

      // do not show completed quests, but show them in hideMode
      if (visible && hideComplete && completed && !hideMode) {
        visible = false;
      }

      // we want to always show rewards for completed quests, but don't want rewards in hideMode
      if (!visible && !completed || hideMode) {
        return visible;
      }

      // generate rewards
      let rewardArray = completed ? claimedRewards : availableRewards;
      quest.rewards.forEach(reward => {
        let rewardGroup;
        if (reward.type === REWARD.ITEM) {
          rewardGroup = rewardArray.find(rw => rw.type === reward.type && rw.item.name === reward.item.name);
        } else {
          rewardGroup = rewardArray.find(rw => rw.type === reward.type);
        }
        if (rewardGroup) {
          // increase existing reward group count
          rewardGroup.count += reward.count || 1;
        } else {
          // create new reward entry
          const newGroup = { ...reward, count: reward.count || 1 };
          if (reward.type === REWARD.GILDA) {
            newGroup.item = ITEM.GILDA_STAR;
          }
          rewardArray.push(newGroup);
        }
      });

      return visible;
    });

    const footnote = 'Note: This comprehensive list does not include most quests that aren\'t completable every day, such as some world boss quests.';

    setTitle('Daily Checklist');

    return (
      <div className="quest-container">
        <Paper className="section quest-list" style={mainStyle}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className={cn({ 'title-text': !hideMode })}>Daily Checklist</Typography>
              {hideMode &&
              <Typography variant="overline" style={{ marginLeft: 12 }} className={cn({ 'title-text': hideMode })}>
                [Hiding] Unmarked quests will never show
              </Typography>}
              <Tooltip title={hideMode ? 'Restore all hidden' : 'Reset all quests.'}>
                <IconButton color="inherit" aria-label="Reset" onClick={this.handleReset}>
                  {hideMode ? <Visibility /> : <Replay />}
                </IconButton>
              </Tooltip>
              {this.showSettingsMenu() &&
              <IconButton color="inherit" aria-label="Menu" onClick={this.handleOpen}>
                <Settings />
              </IconButton>}
            </Toolbar>
          </AppBar>
          {visibleQuests.sort((a, b) => {
            if (a.name === b.name) {
              if (a.zones[0] > b.zones[0]) return 1;
              if (a.zones[0] < b.zones[0]) return -1;
              return 0;
            }
            return (a.name > b.name) ? 1 : -1;
          }).map((quest) => <Quest key={getQuestId(quest)} {...quest} />)}
        </Paper>
        {!this.showSettingsMenu() &&
        <div className="section quest-filters">
          <Paper>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">Filters</Typography>
              </Toolbar>
            </AppBar>
            <Filters availableRewards={availableRewards} claimedRewards={claimedRewards} />
          </Paper>
          <Typography variant="overline" className="footnote">{footnote}</Typography>
        </div>}
        <Dialog open={this.showSettingsMenu() && filtersOpen} onClose={this.handleClose}>
          <DialogTitle>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">Filters</Typography>
                <IconButton color="inherit" aria-label="Close" onClick={this.handleClose}>
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className="quest-filters">
            <Filters availableRewards={availableRewards} claimedRewards={claimedRewards} />
            <Typography variant="overline" className="footnote-dialog">{footnote}</Typography>
          </DialogContent>
        </Dialog>
        <Zoom in={scrollY >= 720} unmountOnExit>
          <Fab
            color="primary"
            className="fab"
            onClick={() => document.getElementById('app').scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <ExpandLess />
          </Fab>
        </Zoom>
      </div>
    );
  }
}

const mapStateToProps = ({ dailies: { continents, faction, rewards, types, hideComplete, quests, hideMode, hiddenQuests }, display: { mobile } }) => ({
  continents,
  faction,
  rewards,
  types,
  hideComplete,
  quests,
  displayMobile: mobile,
  hideMode,
  hiddenQuests,
});

const mapDispatchToProps = {
  resetQuests,
  resetHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dailies);
