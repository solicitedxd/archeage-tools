import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  AppBar,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  HOUSING_TYPES,
  PROFICIENCY,
  TAX_BURDEN,
} from 'constants/taxes';
import { deepCopy } from 'utils/skills';
import PropertyBox from './PropertyBox';

class Taxes extends Component {
  constructor() {
    super();

    const properties = {};
    Object.keys(HOUSING_TYPES).forEach(key => properties[key] = ['', '']);

    this.state = {
      properties,
      showHostile: false,
      proficiency: PROFICIENCY[0].name,
    };
  }

  toggleHostile = (e, checked) => {
    this.setState({ showHostile: checked });
  };

  handleProficiency = (e, value) => {
    this.setState({ proficiency: value.key });
  };

  setValue = (key, index, value) => {
    const { properties: propertiesOld } = this.state;
    const properties = deepCopy(propertiesOld);

    // update value after validation
    value = parseInt(value) || '';
    if (value < 0) value = 0;
    if (value > 10) value = 10;
    properties[key][index] = value;

    this.setState({ properties });
  };

  render() {
    const { mobile } = this.props;
    const { properties, showHostile, proficiency: proficiencyName } = this.state;
    const proficiency = PROFICIENCY.find(prof => prof.name === proficiencyName);

    const propertyCount = Object.values(properties)
    .map(values => (parseInt(values[0]) || 0) + ((parseInt(values[1]) || 0) * (showHostile ? 1 : 0)))
    .reduce((a, b) => a + b) || 0;
    const taxBurden = TAX_BURDEN[Math.min(propertyCount, 10)];
    let hostileIncrease = 0;
    const taxesPerWeek = Math.round(Object.keys(properties).map(key => {
      const [friendly, hostile] = properties[key];
      const friendlyCost = (friendly || 0) * HOUSING_TYPES[key].base;
      const hostileCost = (hostile || 0) * HOUSING_TYPES[key].base * (showHostile ? 1 : 0);
      hostileIncrease += hostileCost;
      return (friendlyCost + hostileCost);
    }).reduce((a, b) => a + b) * ((taxBurden + 100) / 100) + hostileIncrease);

    const laborCost = Math.ceil(taxesPerWeek / 5) * (300 * proficiency.cost);

    return (
      <div className={cn('calendar-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Taxes Calculator</Typography>
            </Toolbar>
          </AppBar>
          <div className="calculator-totals">
            <div className="total-list">
              <div>
                <Typography>Property Count:</Typography>
                <Typography>{propertyCount}</Typography>
              </div>
              <div>
                <Typography>Tax Rate:</Typography>
                <Typography>{taxBurden + 100}%</Typography>
              </div>
              <div>
                <Typography>Taxes per Week:</Typography>
                <Typography>{taxesPerWeek}</Typography>
              </div>
              <div>
                <Typography>Labor per Week:</Typography>
                <Typography>{laborCost}</Typography>
              </div>
            </div>
            <FormControl>
              <InputLabel htmlFor="proficiency">Construction Proficiency</InputLabel>
              <Select
                value={proficiencyName}
                onChange={this.handleProficiency}
                inputProps={{
                  name: 'proficiency',
                  id: 'proficiency',
                }}
                renderValue={() => (
                  <div className="proficiency-row" data-quality={proficiency.quality}>
                    <span className={cn('proficiency-icon', proficiency.name)} />
                    <span className="quality-color">{proficiency.name}</span>
                  </div>
                )}
              >
                {PROFICIENCY.map(proficiency => (
                  <MenuItem value={proficiency.name} key={proficiency.name} data-quality={proficiency.quality}>
                    <span className={cn('proficiency-icon', proficiency.name)} />
                    <span className="quality-color">{proficiency.name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox onChange={this.toggleHostile} checked={showHostile} color="primary" />}
              label="Show Hostile Options"
            />
          </div>
        </Paper>
        <Paper className="section calculator-container">
          {Object.keys(HOUSING_TYPES).map(key => (
            <PropertyBox
              {...HOUSING_TYPES[key]}
              onChange={(key, index) => (e) => this.setValue(key, index, e.target.value)}
              values={properties[key]}
              key={key}
              id={key}
              showHostile={showHostile}
            />
          ))}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

export default connect(mapStateToProps, null)(Taxes);
