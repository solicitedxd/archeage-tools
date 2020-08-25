import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchContinents } from 'actions/gameData';
import {
  setCastles,
  setResidence,
} from 'actions/myGame';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';

class Residence extends Component {
  static propTypes = {
    fetchContinents: func.isRequired,
    setResidence: func.isRequired,
    setCastles: func.isRequired,
    residence: array,
    castles: array,
    continents: object,
    zones: object,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    this.props.fetchContinents();
  }

  render() {
    const { residence, castles, continents, zones, setResidence, setCastles } = this.props;

    const zoneOptions = Object.values(zones).filter(z => z.housing)
    .map(z => ({
      ...z,
      group: continents[z.continentId].name,
    }))
    .sort(sortBy('group', true, sortBy('name')));

    const castleOptions = Object.values(zones).filter(z => z.claimable)
    .sort(sortBy('name'));

    return (
      <div className="residence-wrapper">
        <Autocomplete
          multiple
          options={zoneOptions}
          getOptionLabel={(option) => {
            if (typeof option === 'number') {
              return pathOr('', [option, 'name'])(zones);
            } else {
              return option.name;
            }
          }}
          getOptionSelected={(option, value) => option.id === value}
          groupBy={option => option.group}
          onChange={setResidence}
          value={residence}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Your Residential Zones"
              placeholder="Select zone"
            />
          )}
        />
        <Autocomplete
          multiple
          options={castleOptions}
          getOptionLabel={(option) => {
            if (typeof option === 'number') {
              return pathOr('', [option, 'name'])(zones);
            } else {
              return option.name;
            }
          }}
          getOptionSelected={(option, value) => option.id === value}
          groupBy={option => option.group}
          onChange={setCastles}
          value={castles}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Your Faction's Castles"
              placeholder="Select zone"
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ myGame: { residence, castles }, gameData: { continents, zones } }) => ({
  residence,
  castles,
  continents,
  zones,
});

const mapDispatchToProps = {
  fetchContinents,
  setResidence,
  setCastles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Residence);
