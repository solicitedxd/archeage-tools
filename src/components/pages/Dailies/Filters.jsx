import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 230,
    },
  },
};

class Filters extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  handleFactionChange = (event) => this.props.filterFaction(event.target.value);
  handleContinentChange = (event) => this.props.filterContinents(event.target.value);
  handleRewardChange = (event) => this.props.filterRewards(event.target.value);
  handleTypeChange = (event) => this.props.filterTypes(event.target.value);
  handleCompleteChange = (event, value) => this.props.filterComplete(value);

  render() {
    const { continents, faction, rewards, types, hideComplete } = this.props;

    return (
      <div>
        <FormControl className="filter-field">
          <InputLabel htmlFor="select-faction">Faction</InputLabel>
          <Select
            value={faction}
            onChange={this.handleFactionChange}
            inputProps={{
              name: 'faction',
              id: 'select-faction',
            }}
            fullWidth
          >
            {Object.values(FACTION).map(faction => (
              <MenuItem key={faction} value={faction}>
                <ListItemText primary={faction} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="filter-field">
          <InputLabel htmlFor="select-continent">Continents</InputLabel>
          <Select
            multiple
            value={continents}
            onChange={this.handleContinentChange}
            input={<Input id="select-continent" fullWidth />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {Object.values(CONTINENT).map(continent => (
              <MenuItem key={continent.name} value={continent.name}>
                <Checkbox checked={continents.indexOf(continent.name) > -1} />
                <ListItemText primary={continent.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="filter-field">
          <InputLabel htmlFor="select-rewards">Rewards</InputLabel>
          <Select
            multiple
            value={rewards}
            onChange={this.handleRewardChange}
            input={<Input id="select-rewards" fullWidth />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {Object.values(REWARD).sort().map(reward => (
              <MenuItem key={reward} value={reward}>
                <Checkbox checked={rewards.indexOf(reward) > -1} />
                <ListItemIcon><span className={cn('dropdown-icon', reward)} /></ListItemIcon>
                <ListItemText primary={reward} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="filter-field">
          <InputLabel htmlFor="select-types">Quest Types</InputLabel>
          <Select
            multiple
            value={types}
            onChange={this.handleTypeChange}
            input={<Input id="select-types" fullWidth />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {Object.values(TYPE).sort().map(type => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={types.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
