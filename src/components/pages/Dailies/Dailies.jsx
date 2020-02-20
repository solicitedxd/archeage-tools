import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import SettingsIcon from '@material-ui/icons/Settings';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  resetFilters,
  resetHide,
  resetQuests,
} from 'actions/dailies';
import cn from 'classnames';
import ScrollToTop from 'components/ScrollToTop';
import { DAILY_TYPE } from 'constants/dailies';
import { CURRENCY } from 'constants/items';
import { CONTINENT } from 'constants/map';
import dailyQuests from 'data/dailies';
import ITEM from 'data/items';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getKey,
  getZones,
} from 'utils/dailies';
import { setTitle } from 'utils/string';
import Filters from './Filters';
import Quest from './Quest';

class Dailies extends Component {
  state = {
    filtersOpen: false,
  };

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

  handleResetFilters = () => {
    this.props.resetFilters();
  };

  render() {
    const { continents, faction, rewards, types, hideComplete, quests, hideMode, hiddenQuests } = this.props;
    const { filtersOpen } = this.state;
    const zonesFromContinents = [].concat.apply([], continents.map(continent => Object.values(CONTINENT).find((ct) => ct.name === continent).zones));
    const mainStyle = this.showSettingsMenu() ? { width: '100%' } : { width: '80%', minWidth: '280px' };

    // calculate the available and gained rewards
    // noinspection JSMismatchedCollectionQueryUpdate
    const availableRewards = [];
    // noinspection JSMismatchedCollectionQueryUpdate
    const claimedRewards = [];

    const visibleQuests = dailyQuests.filter(quest => {
      const completed = quests[getKey(quest)] || false;
      const hidden = hiddenQuests && hiddenQuests[getKey(quest)] || false;
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

      if (visible && types.length > 0 && ((quest.type && !types.includes(quest.type)) || (!quest.type && !types.includes(DAILY_TYPE.OTHER)))) {
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
        if (reward.type === CURRENCY.ITEM) {
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
          if (reward.type === CURRENCY.GILDA) {
            newGroup.item = ITEM.GILDA_STAR;
          }
          if (reward.type === CURRENCY.BLUE_SALT_BOND) {
            newGroup.item = ITEM.BLUE_SALT_BOND;
          }
          rewardArray.push(newGroup);
        }
      });

      return visible;
    });

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
                  {hideMode ? <VisibilityIcon /> : <ReplayIcon />}
                </IconButton>
              </Tooltip>
              {this.showSettingsMenu() &&
              <IconButton color="inherit" aria-label="Menu" onClick={this.handleOpen}>
                <SettingsIcon />
              </IconButton>}
            </Toolbar>
          </AppBar>
          {visibleQuests
          .sort((a, b) => ((a.sort || a.name) > (b.sort || b.name)) ? 1 : -1)
          .map((quest) => (
            <Quest key={getKey(quest)} {...quest} />
          ))}
        </Paper>
        {!this.showSettingsMenu() &&
        <div className="section quest-filters">
          <Paper>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">Filters</Typography>
                <Tooltip title="Reset all filters.">
                  <IconButton color="inherit" aria-label="Reset" onClick={this.handleResetFilters}>
                    <ReplayIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <Filters availableRewards={availableRewards} claimedRewards={claimedRewards} />
          </Paper>
        </div>}
        <Dialog open={this.showSettingsMenu() && filtersOpen} onClose={this.handleClose}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Filters</Typography>
              <Tooltip title="Reset all filters.">
                <IconButton color="inherit" aria-label="Reset" onClick={this.handleResetFilters}>
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
              <IconButton color="inherit" aria-label="Close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent className="quest-filters">
            <Filters availableRewards={availableRewards} claimedRewards={claimedRewards} />
          </DialogContent>
        </Dialog>
        <ScrollToTop />
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
  resetFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dailies);
