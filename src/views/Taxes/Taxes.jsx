import {
  AppBar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Autocomplete } from '@material-ui/lab';
import { openDialog } from 'actions/display';
import { fetchBuildingItems } from 'actions/gameData';
import { calculateLabor } from 'actions/proficiencies';
import {
  addBuilding,
  createBuilding,
  deleteBuilding,
  setHostileBuilding,
} from 'actions/taxes';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemPrice from 'components/Item/ItemPrice';
import { DIALOG_PROFICIENCY } from 'constants/display';
import {
  CURRENCY,
  ITEM,
} from 'constants/items';
import { CONSTRUCTION } from 'constants/proficiencies';
import {
  BUILDING_NAME_REGEX,
  HEAVY_TAX_RATE,
  HOSTILE_FACTION_TAX,
} from 'constants/taxes';
import React, { Component } from 'react';
import {
  arrayOf,
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import {
  countProperties,
  deepCopy,
  hasProperty,
} from 'utils/object';
import { setTitle } from 'utils/string';
import PropertyList from './PropertyList';
import PropertyTable from './PropertyTable';

class Taxes extends Component {
  static propTypes = {
    openDialog: func.isRequired,
    calculateLabor: func.isRequired,
    fetchBuildingItems: func.isRequired,
    createBuilding: func.isRequired,
    addBuilding: func.isRequired,
    deleteBuilding: func.isRequired,
    setHostileBuilding: func.isRequired,
    mobile: bool,
    price: number,
    buildingIds: arrayOf(number),
    items: object,
    buildings: arrayOf(object),
    sort: string,
    direction: bool,
  };

  state = {
    hostile: false,
    options: [],
    building: {},
  };

  componentDidMount() {
    this.props.fetchBuildingItems();

    if (countProperties(this.props.items) === this.props.buildingIds.length) {
      this.initBuildings();
    }
  }

  componentDidUpdate(prevProps) {
    const { items, buildingIds } = this.props;

    if (countProperties(prevProps.items) !== prevProps.buildingIds.length && countProperties(items) === buildingIds.length) {
      this.initBuildings();
    }
  }

  initBuildings = () => {
    const { items, createBuilding } = this.props;

    const buildingOptions = {};
    Object.entries(items).forEach(([itemId, item]) => {
      const [, name] = (item.name.match(BUILDING_NAME_REGEX) || [null, null]);
      if (!hasProperty(buildingOptions, name)) {
        buildingOptions[name] = createBuilding(itemId);
      }
    });
    this.setState({ options: Object.values(buildingOptions).sort(sortBy('group', true, sortBy('size'))) });
  };

  handleSelectBuilding = (e, building) => {
    this.setState({ building });
  };

  addProperty = () => {
    const { building, hostile } = this.state;

    if (building.itemId) {
      this.props.addBuilding(building.itemId, hostile);
      this.setState({ building: {} });
    }
  };

  toggleHostile = (e, hostile) => {
    this.setState({ hostile });
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

  calculateTax = (property, heavyTaxRate) => {
    const { baseTax } = property;
    if (!baseTax) return { baseTax: 0, heavyTaxFee: 0, hostileFee: 0, totalTax: 0 };

    const heavyTaxFee = !property.exempt ? Math.round(baseTax * heavyTaxRate) : 0;
    const hostileFee = property.hostile ? baseTax * HOSTILE_FACTION_TAX : 0;
    return { baseTax, heavyTaxFee, hostileFee, totalTax: (baseTax + heavyTaxFee + hostileFee) };
  };

  calculateTaxes = (properties, heavyTaxRate) => properties.map(property => this.calculateTax(property, heavyTaxRate).totalTax).reduce((a, b) => a + b, 0);

  render() {
    const { openDialog, calculateLabor, mobile, price, buildings, createBuilding } = this.props;
    const { hostile, options, building } = this.state;

    setTitle('Tax Calculator');

    const properties = buildings.map(({ itemId, hostile }, index) => ({ ...createBuilding(itemId), hostile, index }));
    const heavyTaxProperties = properties.map(property => property.exempt ? 0 : 1).reduce((a, b) => a + b, 0);

    const heavyTaxRate = HEAVY_TAX_RATE[Math.min(heavyTaxProperties, 10)];
    const taxesPerWeek = this.calculateTaxes(properties, heavyTaxRate);

    const laborCost = Math.ceil(taxesPerWeek / 5) * (calculateLabor(300, CONSTRUCTION));

    // pending property
    const pendingProperty = building.itemId ? ({ ...createBuilding(building.itemId), hostile }) : null;
    let placeCost = 0;
    let placeIncrease = 0;
    if (pendingProperty) {
      const { baseTax, deposit, hostile, exempt } = pendingProperty;
      const newHeavyProperties = heavyTaxProperties + (exempt ? 0 : 1);
      const newHeavyRate = HEAVY_TAX_RATE[Math.min(newHeavyProperties, 10)];
      const heavyTaxFee = !exempt ? Math.round(newHeavyRate * baseTax) : 0;
      const hostileFee = hostile ? baseTax * HOSTILE_FACTION_TAX : 0;
      const taxRate = baseTax + heavyTaxFee + hostileFee;
      const newTaxes = this.calculateTaxes([...properties, pendingProperty], newHeavyRate);
      placeIncrease = newTaxes - taxesPerWeek;
      placeCost = taxRate + deposit;
    }

    const taxPrice = (
      <>
        <TableCell colSpan={mobile ? 2 : 1}>
          <Item id={ITEM.TAX_CERTIFICATE} inline /> Price:
        </TableCell>
        <TableCell align="right" colSpan={mobile ? 2 : 1}>
          <ItemPrice itemId={ITEM.TAX_CERTIFICATE} unitSize={1} />
        </TableCell>
      </>
    );

    const taxSilverPerLabor = (
      <>
        <TableCell colSpan={mobile ? 2 : 1}>
          <Tooltip title="Silver per labor">
            <span>
              <span className="dropdown-icon silver" /> per Labor:
            </span>
          </Tooltip>
        </TableCell>
        <TableCell align="right" colSpan={mobile ? 2 : 1}>
          <Currency
            type={CURRENCY.COIN}
            count={(price ? price - 0.0046 : 0) * 5 / calculateLabor(300, CONSTRUCTION) * 10000}
          />
        </TableCell>
      </>
    );

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Tax Calculator</Typography>
              <Tooltip title="Configure Proficiency">
                <IconButton onClick={() => openDialog(DIALOG_PROFICIENCY)} color="inherit">
                  <ListAltIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <div className="calculator-box">
            <div className="calculator-totals">
              <Autocomplete
                className="building-select"
                autoHighlight
                disableClearable
                blurOnSelect
                size="small"
                loading={!options.length}
                options={options}
                onChange={this.handleSelectBuilding}
                value={building}
                getOptionLabel={option => option.name || ''}
                renderOption={option => (
                  <div className="item-result" key={option.id}>
                    <Item id={option.itemId} inline />
                    <Typography variant="body2">{option.name}</Typography>
                  </div>
                )}
                groupBy={option => option.group}
                renderInput={params => (
                  <FormControl>
                    <TextField
                      {...params}
                      label={`Find a building`}
                      variant="standard"
                      size="medium"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                      }}
                    />
                  </FormControl>
                )}
              />
              <Table size="small" className="place-info">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Item id={ITEM.TAX_CERTIFICATE} inline /> to Place:
                    </TableCell>
                    <TableCell align="right">
                      {placeCost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Additional <Item id={ITEM.TAX_CERTIFICATE} inline /> per Week:
                    </TableCell>
                    <TableCell align="right">
                      {placeIncrease}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="form-options">
                <Tooltip title={
                  <>
                    <Typography style={{ textDecoration: 'underline' }}>Hostile Zones</Typography>
                    <Typography variant="body2">
                      Hostile zones are zones that are controlled by an enemy faction.<br />
                      Conflict zones are not considered hostile, but Growlgate Isle is considered hostile if you&apos;re
                      not a pirate.<br />
                      Placing property in a hostile zone will incur a hostile faction tax of
                      +{HOSTILE_FACTION_TAX * 100}%.
                    </Typography>
                  </>
                }
                >
                  <FormControlLabel
                    control={<Checkbox onChange={this.toggleHostile} checked={hostile} color="primary" />}
                    label="In Hostile Zone"
                  />
                </Tooltip>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!building.itemId}
                  onClick={this.addProperty}
                >
                  Add Property
                </Button>
              </div>
              <Table size="small" className="total-list" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={mobile ? 4 : 6}>
                      Tax Totals
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Properties:</TableCell>
                    <TableCell align="right">
                      {properties.length}
                      {heavyTaxProperties !== properties.length &&
                      <Tooltip title="Heavy Tax Properties">
                        <span>&nbsp;<span className="hint">({heavyTaxProperties})</span></span>
                      </Tooltip>}
                    </TableCell>
                    <TableCell>Heavy Tax Rate:</TableCell>
                    <TableCell align="right">+{(heavyTaxRate * 100)}%</TableCell>
                    {!mobile && taxPrice}
                  </TableRow>
                  <TableRow>
                    <TableCell><Item id={ITEM.TAX_CERTIFICATE} inline /> per Week:</TableCell>
                    <TableCell align="right">{taxesPerWeek}</TableCell>
                    <TableCell>Labor per Week:</TableCell>
                    <TableCell align="right">{laborCost}</TableCell>
                    {!mobile && taxSilverPerLabor}
                  </TableRow>
                  {mobile &&
                  <>
                    <TableRow>
                      {taxPrice}
                    </TableRow>
                    <TableRow>
                      {taxSilverPerLabor}
                    </TableRow>
                  </>}
                </TableBody>
              </Table>
            </div>
            {!mobile &&
            <AdContainer section={false} type="square" />}
          </div>
        </Paper>
        {mobile && <AdContainer type="feed" />}
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className="title-text">Properties</Typography>
            </Toolbar>
          </AppBar>
          {mobile
            ? <PropertyList
              calculateTax={this.calculateTax}
              heavyTaxProperties={heavyTaxProperties}
              heavyTaxRate={heavyTaxRate}
            />
            : <PropertyTable
              calculateTax={this.calculateTax}
              heavyTaxProperties={heavyTaxProperties}
              heavyTaxRate={heavyTaxRate}
            />}
        </Paper>
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, gameData: { items, buildings }, taxes, itemPrice }) => ({
  mobile,
  price: itemPrice[ITEM.TAX_CERTIFICATE],
  ...taxes,
  items: Object.keys(items).filter(itemId => buildings.includes(Number(itemId))).reduce((obj, key) => {
    obj[key] = items[key];
    return obj;
  }, {}),
  buildingIds: buildings,
});

const mapDispatchToProps = {
  openDialog,
  calculateLabor,
  fetchBuildingItems,
  createBuilding,
  addBuilding,
  deleteBuilding,
  setHostileBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
