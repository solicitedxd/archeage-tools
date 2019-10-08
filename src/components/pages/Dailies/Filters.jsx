import React, { Component } from 'react';
import { array } from 'react-proptypes';
import { connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import {
  filterComplete,
  filterContinents,
  filterFaction,
  filterRewards,
  filterTypes,
  resetQuests,
  setQuestStatus,
} from 'actions/dailies';
import {
  CONTINENT,
  FACTION,
  REWARD,
  TYPE,
} from 'constants/dailies';
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

  render() {
    const { continents, faction, rewards, types, hideComplete, availableRewards, claimedRewards } = this.props;

    return (
      <div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Faction</Typography>
          <ButtonGroup>
            {Object.values(FACTION).map(f => (
              <Button
                key={f}
                variant={faction === f ? 'contained' : 'outlined'}
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
                onClick={() => this.handleContinentChange(continent.name)}
              >
                {continent.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="filter-field">
          <Typography variant="subtitle2" className="label">Rewards</Typography>
          <div className="filter-group rewards">
            {Object.values(REWARD).sort().map(reward => (
              <Tooltip title={reward} key={reward}>
                <Button
                  variant={rewards.includes(reward) ? 'contained' : 'outlined'}
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
            {Object.values(TYPE).sort().map(type => (
              <Button
                key={type}
                variant={types.includes(type) ? 'contained' : 'outlined'}
                onClick={() => this.handleTypeChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
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
        </FormControl>

        <RewardsDisplay title="Earned Rewards" rewards={claimedRewards} expanded />
        <RewardsDisplay title="Available Rewards" rewards={availableRewards} />
      </div>
    );
  }
}

const mapStateToProps = ({ dailies: { continents, faction, rewards, types, hideComplete } }) => ({
  continents,
  faction,
  rewards,
  types,
  hideComplete,
});

const mapDispatchToProps = {
  filterComplete,
  filterContinents,
  filterFaction,
  filterRewards,
  filterTypes,
  resetQuests,
  setQuestStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
