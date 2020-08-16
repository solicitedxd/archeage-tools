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
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import { DIALOG_PROFICIENCY } from 'constants/display';
import {
  CURRENCY,
  ITEM,
} from 'constants/items';
import { CONSTRUCTION } from 'constants/proficiencies';
import {
  BUILDING_NAME_REGEX,
  HOUSING_TYPES,
  TAX_BURDEN,
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
import PropertyBox from './PropertyBox';

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

  constructor() {
    super();

    const properties = {};
    Object.keys(HOUSING_TYPES).forEach(key => {
      properties[key] = ['', ''];
    });

    this.state = {
      properties,
      hostile: false,
      options: [],
      building: {},
    };
  }

  componentDidMount() {
    this.props.fetchBuildingItems();
  }

  componentDidUpdate(prevProps) {
    const { items, buildingIds, createBuilding } = this.props;

    if (countProperties(prevProps.items) !== prevProps.buildingIds.length && countProperties(items) === buildingIds.length) {
      const buildingOptions = {};
      Object.entries(items).forEach(([itemId, item]) => {
        const [, name] = (item.name.match(BUILDING_NAME_REGEX) || [null, null]);
        if (!hasProperty(buildingOptions, name)) {
          buildingOptions[name] = createBuilding(itemId);
        }
      });
      this.setState({ options: Object.values(buildingOptions).sort(sortBy('group', true, sortBy('size'))) });
    }
  }

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

  render() {
    const { openDialog, calculateLabor, mobile, price } = this.props;
    const { properties, hostile, options, building } = this.state;

    // regular land tax
    const regularProperties = Object.entries(properties).filter(([key]) => !key.includes('EXEMPT'));
    let propertyCount = regularProperties
    .map(([, values]) => (parseInt(values[0]) || 0) + ((parseInt(values[1]) || 0) * (hostile ? 1 : 0)))
    .reduce((a, b) => a + b) || 0;
    const taxBurden = TAX_BURDEN[Math.min(propertyCount, 10)];
    let hostileIncrease = 0;
    let taxesPerWeek = (Math.round(regularProperties.map(([key, value]) => {
      const [friendly, hostile] = value;
      const friendlyCost = (friendly || 0) * HOUSING_TYPES[key].base;
      const hostileCost = (hostile || 0) * HOUSING_TYPES[key].base * (hostile ? 1 : 0);
      hostileIncrease += hostileCost;
      return (friendlyCost + hostileCost);
    }).reduce((a, b) => a + b) * ((taxBurden + 100) / 100)) + (hostileIncrease * 3));

    const exemptProperties = Object.entries(properties).filter(([key]) => key.includes('EXEMPT'));
    // high tax exempt farms
    propertyCount += exemptProperties
    .map(([, values]) => (parseInt(values[0]) || 0) + ((parseInt(values[1]) || 0) * (hostile ? 1 : 0)))
    .reduce((a, b) => a + b) || 0;
    taxesPerWeek += (exemptProperties.map(([key, value]) => value[0] * HOUSING_TYPES[key].base).reduce((a, b) => a + b));

    const laborCost = Math.ceil(taxesPerWeek / 5) * (calculateLabor(300, CONSTRUCTION));

    setTitle('Tax Calculator');

    const taxPrice = (
      <>
        <TableCell colSpan={mobile ? 2 : 1}><ItemLink id={31891} name="" /> Price:</TableCell>
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
                      <ItemLink id={ITEM.TAX_CERTIFICATE} name="" /> to Place:
                    </TableCell>
                    <TableCell align="right">
                      0
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Additional <ItemLink id={ITEM.TAX_CERTIFICATE} name="" /> per Week:
                    </TableCell>
                    <TableCell align="right">
                      0
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
                      Housing zones in conflict zones are not considered hostile, but Growlgate Isle is considered
                      hostile if you&apos;re not a pirate.<br />
                      Placing property in a hostile zone will increase the tax for that property by 100% of its base
                      tax amount.
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
              <Table size="small" className="total-list">
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
                    <TableCell align="right">{propertyCount}</TableCell>
                    <TableCell>Tax Rate:</TableCell>
                    <TableCell align="right">{taxBurden + 100}%</TableCell>
                    {!mobile && taxPrice}
                  </TableRow>
                  <TableRow>
                    <TableCell><ItemLink id={ITEM.TAX_CERTIFICATE} name="" /> per Week:</TableCell>
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
          <div className="calculator-container">
            {Object.keys(HOUSING_TYPES).map(key => (
              <PropertyBox
                {...HOUSING_TYPES[key]}
                onChange={(key, index) => (e) => this.setValue(key, index, e.target.value)}
                values={properties[key]}
                key={key}
                id={key}
                showHostile={hostile}
              />
            ))}
          </div>
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
