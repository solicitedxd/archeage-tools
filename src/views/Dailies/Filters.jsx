import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  filterComplete,
  filterContinents,
  filterFaction,
  filterRewards,
  filterTypes,
  resetQuests,
  setHideMode,
  setQuestStatus,
} from 'actions/dailies';
import cn from 'classnames';
import {
  CURRENCY_DISPLAY,
  DAILY_TYPE,
} from 'constants/dailies';
import { CURRENCY } from 'constants/items';
import {
  CONTINENT,
  FACTION,
} from 'constants/map';
import React, { Component } from 'react';
import { array } from 'react-proptypes';
import { connect } from 'react-redux';
import RewardsDisplay from './RewardsDisplay';

class Filters extends Component {
  static propTypes = {
    availableRewards: array,
    claimedRewards: array,
  };

  static defaultProps = {
    availableRewards: [],
    claimedRewards: [],
  };

  handleFactionChange = (value) => this.props.filterFaction(value);
  handleContinentChange = (value) => {
    const { continents: old } = this.props;
    const newValue = [...old];
    if (newValue.indexOf(value) > -1) {
      newValue.splice(newValue.indexOf(value), 1);
    } else {
      newValue.push(value);
    }
    this.props.filterContinents(newValue);
  };
  handleRewardChange = (value) => {
    const { rewards: old } = this.props;
    const newValue = [...old];
    if (newValue.indexOf(value) > -1) {
      newValue.splice(newValue.indexOf(value), 1);
    } else {
      newValue.push(value);
    }
    this.props.filterRewards(newValue);
  };
  handleTypeChange = (value) => {
    const { types: old } = this.props;
    const newValue = [...old];
    if (newValue.indexOf(value) > -1) {
      newValue.splice(newValue.indexOf(value), 1);
    } else {
      newValue.push(value);
    }
    this.props.filterTypes(newValue);
  };
  handleCompleteChange = (event, value) => this.props.filterComplete(value);

  toggleHideMode = () => {
    const { hideMode, setHideMode } = this.props;
    setHideMode(!hideMode);
  };

  render() {
    const { continents, faction, rewards, types, hideComplete, availableRewards, claimedRewards, hideMode } = this.props;

    return (
      <div>
        <div className="filter-field">
          <div className="filter-group">
            <Button
              variant={hideMode ? 'contained' : 'outlined'}
              className={cn({ hideSelected: hideMode })}
              onClick={this.toggleHideMode}
            >
              {hideMode ? 'Stop Hiding Quests' : 'Hide Undesired Quests'}
            </Button>
          </div>
        </div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Faction</Typography>
          <ButtonGroup className="filter-group">
            {Object.values(FACTION).map(f => (
              <Button
                key={f}
                variant={faction === f ? 'contained' : 'outlined'}
                className={cn({ selected: faction === f })}
                onClick={() => this.handleFactionChange(f)}>
                {f}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Continents</Typography>
          <div className="filter-group">
            {Object.values(CONTINENT).map(continent => (
              <Button
                key={continent.name}
                variant={continents.includes(continent.name) ? 'contained' : 'outlined'}
                className={cn({ selected: continents.includes(continent.name) })}
                onClick={() => this.handleContinentChange(continent.name)}
              >
                {continent.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Rewards</Typography>
          <div className="filter-group rewards grid">
            {Object.values(CURRENCY).filter(r => CURRENCY_DISPLAY.includes(r)).sort().map(reward => (
              <Tooltip title={reward} key={reward}>
                <Button
                  variant={rewards.includes(reward) ? 'contained' : 'outlined'}
                  className={cn({ selected: rewards.includes(reward) })}
                  onClick={() => this.handleRewardChange(reward)}
                >
                  <span className={cn('dropdown-icon', reward)} />
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Quest Types</Typography>
          <div className="filter-group">
            {Object.values(DAILY_TYPE).sort().map(type => (
              <Button
                key={type}
                variant={types.includes(type) ? 'contained' : 'outlined'}
                className={cn({ selected: types.includes(type) })}
                onClick={() => this.handleTypeChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        {!hideMode &&
        <FormControl className="filter-field">
          <FormControlLabel
            control={
              <Checkbox
                checked={hideComplete}
                onChange={this.handleCompleteChange}
                color="primary"
              />
            }
            label="Hide Completed Quests" />
        </FormControl>}

        {!hideMode && <RewardsDisplay title="Earned Rewards" rewards={claimedRewards} expanded />}
        {!hideMode && <RewardsDisplay title="Available Rewards" rewards={availableRewards} />}
      </div>
    );
  }
}

const mapStateToProps = ({ dailies: { continents, faction, rewards, types, hideComplete, hideMode } }) => ({
  continents,
  faction,
  rewards,
  types,
  hideComplete,
  hideMode,
});

const mapDispatchToProps = {
  filterComplete,
  filterContinents,
  filterFaction,
  filterRewards,
  filterTypes,
  resetQuests,
  setQuestStatus,
  setHideMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
