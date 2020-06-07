import {
  AppBar,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { openDialog } from 'actions/display';
import { calculateLabor } from 'actions/proficiencies';
import cn from 'classnames';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import { DIALOG_PROFICIENCY } from 'constants/display';
import { CURRENCY } from 'constants/items';
import { CONSTRUCTION } from 'constants/proficiencies';
import {
  HOUSING_TYPES,
  TAX_BURDEN,
} from 'constants/taxes';
import ITEM from 'data/items';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deepCopy } from 'utils/object';
import { setTitle } from 'utils/string';
import PropertyBox from './PropertyBox';

class Taxes extends Component {
  constructor() {
    super();

    const properties = {};
    Object.keys(HOUSING_TYPES).forEach(key => properties[key] = ['', '']);

    this.state = {
      properties,
      showHostile: false,
    };
  }

  toggleHostile = (e, checked) => {
    this.setState({ showHostile: checked });
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
    const { openDialog, calculateLabor, mobile, price } = this.props;
    const { properties, showHostile } = this.state;

    // regular land tax
    const regularProperties = Object.entries(properties).filter(([key]) => !key.includes('EXEMPT'));
    let propertyCount = regularProperties
    .map(([, values]) => (parseInt(values[0]) || 0) + ((parseInt(values[1]) || 0) * (showHostile ? 1 : 0)))
    .reduce((a, b) => a + b) || 0;
    const taxBurden = TAX_BURDEN[Math.min(propertyCount, 10)];
    let hostileIncrease = 0;
    let taxesPerWeek = Math.round(regularProperties.map(([key, value]) => {
      const [friendly, hostile] = value;
      const friendlyCost = (friendly || 0) * HOUSING_TYPES[key].base;
      const hostileCost = (hostile || 0) * HOUSING_TYPES[key].base * (showHostile ? 1 : 0);
      hostileIncrease += hostileCost;
      return (friendlyCost + hostileCost);
    }).reduce((a, b) => a + b) * ((taxBurden + 100) / 100) + (hostileIncrease * 3));

    const exemptProperties = Object.entries(properties).filter(([key]) => key.includes('EXEMPT'));
    // high tax exempt farms
    propertyCount += exemptProperties
    .map(([, values]) => (parseInt(values[0]) || 0) + ((parseInt(values[1]) || 0) * (showHostile ? 1 : 0)))
    .reduce((a, b) => a + b) || 0;
    taxesPerWeek += (exemptProperties.map(([key, value]) => value[0] * HOUSING_TYPES[key].base).reduce((a, b) => a + b));

    const laborCost = Math.ceil(taxesPerWeek / 5) * (calculateLabor(300, CONSTRUCTION));

    setTitle('Tax Calculator');

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Tax Calculator</Typography>
              <Tooltip title="Configure Proficiency">
                <IconButton onClick={() => openDialog(DIALOG_PROFICIENCY)}>
                  <ListAltIcon />
                </IconButton>
              </Tooltip>
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
            <Typography component="div">
              <div className="tax-price">
                <div><ItemLink id={31891} /> Price:</div>
                <div><ItemPrice itemId={ITEM.TAX_CERTIFICATE} unitSize={1} /></div>
              </div>
              <div className="tax-price">
                <span>Silver per Labor:</span>
                <Currency
                  type={CURRENCY.COIN}
                  count={(price ? price - 0.0046 : 0) * 5 / calculateLabor(300, CONSTRUCTION) * 10000}
                />
              </div>
            </Typography>
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

const mapStateToProps = ({ display: { mobile }, itemPrice }) => ({
  mobile,
  price: itemPrice[ITEM.TAX_CERTIFICATE],
});

const mapDispatchToProps = {
  openDialog,
  calculateLabor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
