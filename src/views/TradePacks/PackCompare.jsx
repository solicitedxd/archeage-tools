import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchRecipe } from 'actions/gameData';
import { calculateLabor } from 'actions/proficiencies';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import NumberField from 'components/NumberField';
import { CURRENCY } from 'constants/items';
import {
  COMMERCE,
  HUSBANDRY,
} from 'constants/proficiencies';
import {
  BUY_CARGO_LABOR,
  FRESHNESS,
  LARDER_HARVEST_LABOR,
  MAX_COMPARE,
  PACK_PERCENT_MAX,
  PACK_PERCENT_MIN,
  PACK_TYPE,
  SELL_CARGO_LABOR,
  SELL_LABOR,
  WAR_ZONE,
} from 'constants/tradepacks';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { uniqueValues } from 'utils/array';
import { percentModifier } from 'utils/number';
import { objectHasProperties } from 'utils/object';

class PackCompare extends Component {
  static propTypes = {
    region: string,
    packTypes: object,
    freshnessTypes: object,
    tradePacks: array,
    mobile: bool,
    open: bool,
    onClose: func.isRequired,
    zones: object,
    continents: object,
    recipes: object,
    calculateLabor: func.isRequired,
  };

  static defaultProps = {
    packTypes: {},
    freshnessTypes: {},
    tradePacks: [],
    mobile: false,
    open: false,
    zones: {},
    continents: {},
    recipes: {},
  };

  state = {
    packs: [{}],
  };

  tableRows = [];

  updatePack = (i, field) => (value) => {
    const { packs } = this.state;
    packs[i][field] = value;
    this.setState({ packs });

    if (field === 'packTypeId') {
      const { tradePacks } = this.props;
      const pack = tradePacks.find(p => p.originZoneId === packs[i].originZoneId && p.packTypeId === value);
      if (pack) {
        fetchRecipe(pack.recipeId);
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (!equals(this.props.tradePacks, prevProps.tradePacks) || !equals(this.props.zones, prevProps.zones)) {
      this.initialize();
    }
  }

  calculatePackLabor = (pack) => {
    const { calculateLabor, recipes, tradePacks, packTypes } = this.props;

    const tradePack = tradePacks.find(p => p.originZoneId === pack.originZoneId && p.packTypeId === pack.packTypeId);
    if (!tradePack) {
      return { craftLabor: 0, sellLabor: 0, harvestLabor: 0, totalLabor: 0 };
    }

    const aged = pathOr({}, [pack.packTypeId, 'aged'])(packTypes);
    const recipe = pathOr({}, [tradePack.recipeId])(recipes);

    let craftLabor = aged
      ? calculateLabor(65, COMMERCE)
      : calculateLabor(recipe.labor, recipe.vocation);
    // cargo pack, modify
    if (pack.packTypeId === PACK_TYPE.CARGO) {
      craftLabor = calculateLabor(BUY_CARGO_LABOR, COMMERCE);
    }

    const harvestLabor = aged
      ? calculateLabor(LARDER_HARVEST_LABOR, HUSBANDRY)
      : 0;

    const sellLabor = calculateLabor(pack.packTypeId === PACK_TYPE.CARGO ? SELL_CARGO_LABOR
      : SELL_LABOR, COMMERCE);

    let totalLabor = craftLabor + sellLabor + harvestLabor;

    return { craftLabor, sellLabor, harvestLabor, totalLabor };
  };

  getPackProfitLevels = (pack) => {
    const { freshnessTypes, packTypes } = this.props;
    let freshness = Object.values(freshnessTypes).find(f => f.zoneIds.includes(pack.originZoneId));
    if (pack.packTypeId === PACK_TYPE.CARGO) {
      freshness = freshnessTypes[FRESHNESS.CARGO];
    } else if (pack.packTypeId === PACK_TYPE.DISGUISED) {
      freshness = freshnessTypes[FRESHNESS.DISGUISED];
    }

    const packType = packTypes[pack.packTypeId] || {};

    return freshness && packType.freshness ? freshness.profitLevels.filter(p => p.aged === packType.aged) : [];
  };

  calculatePackValue = (pack) => {
    const { tradePacks, packTypes } = this.props;
    const tradePack = tradePacks.find(p => p.originZoneId === pack.originZoneId && p.packTypeId === pack.packTypeId);
    const baseValue = tradePack && tradePack.values.find(v => v.sellZoneId === pack.sellZoneId && v.region === this.props.region);
    const packType = packTypes[pack.packTypeId];
    const profitLevels = this.getPackProfitLevels(pack);

    if (!baseValue) {
      return { value: 0, item: null };
    }

    let packValue = baseValue.value;
    // modify the percentage
    let demand = (Number(pack.demand || PACK_PERCENT_MAX) / PACK_PERCENT_MAX);
    // modify the freshness
    const profitLevel = profitLevels.find(l => l.name === pack.freshness);
    if (profitLevel) {
      packValue *= profitLevel.modifier;
    }
    // modify war bonus
    if (pack.war && packType.warBonus && WAR_ZONE.includes(pack.sellZoneId)) {
      packValue *= 1.15;
    }
    if (baseValue.itemId) {
      packValue = Math.round(packValue);
    } else {
      packValue = Math.round(packValue * 10000);
    }

    packValue = Math.round(packValue * demand);

    return { value: packValue, item: baseValue.itemId };
  };

  deletePack = (packId) => () => {
    const { packs } = this.state;
    packs.splice(packId, 1);
    this.setState({ packs });
  };

  initialize = () => {
    const { zones, tradePacks, packTypes, continents } = this.props;

    if (!objectHasProperties(zones) && tradePacks.length === 0) return;

    const zoneOptions = uniqueValues(tradePacks.map(p => p.originZoneId))
    .map(zId => ({
      ...zones[zId],
      group: continents[zones[zId].continentId].name,
    }));

    this.tableRows = [
      {
        label: 'Zone',
        render: (pack, i) => (
          <Autocomplete
            autoHighlight
            blurOnSelect
            options={zoneOptions}
            getOptionLabel={(option) => option.name}
            groupBy={option => option.group}
            onChange={(e, v) => this.updatePack(i, 'originZoneId')(v ? v.id : null)}
            value={zoneOptions.find(zone => zone.id === pack.originZoneId) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                margin="dense"
                placeholder="Select a zone"
                className="zone-name"
              />
            )}
          />
        ),
      },
      {
        label: 'Pack',
        render: (pack, i) => {
          const zonePackTypes = tradePacks.filter(p => p.originZoneId === pack.originZoneId).map(p => p.packTypeId);
          return (
            <Autocomplete
              autoHighlight
              blurOnSelect
              options={Object.values(packTypes).filter(z => zonePackTypes.includes(z.id))}
              getOptionLabel={(option) => option.name}
              onChange={(e, v) => this.updatePack(i, 'packTypeId')(v ? v.id : null)}
              value={Object.values(packTypes).find(type => type.id === pack.packTypeId) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  margin="dense"
                  placeholder="Select a type"
                  className="zone-name"
                />
              )}
              disabled={!pack.originZoneId}
            />
          );
        },
      },
      {
        label: 'Destination',
        render: (pack, i) => {
          const tradePack = tradePacks.find(p => p.originZoneId === pack.originZoneId && p.packTypeId === pack.packTypeId);
          const destZones = tradePack
            ? tradePack.values.filter(v => v.region === this.props.region).map(v => v.sellZoneId) : [];

          const zoneOptions = destZones.map(zId => ({
            ...zones[zId],
            group: continents[zones[zId].continentId].name,
          }));

          return (
            <Autocomplete
              autoHighlight
              blurOnSelect
              options={zoneOptions}
              getOptionLabel={(option) => option.name}
              groupBy={option => option.group}
              onChange={(e, v) => this.updatePack(i, 'sellZoneId')(v ? v.id : null)}
              value={zoneOptions.find(zone => zone.id === pack.sellZoneId) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  margin="dense"
                  placeholder="Select a zone"
                  className="zone-name"
                />
              )}
              disabled={!pack.packTypeId}
            />
          );
        },
      },
      {
        label: 'Base Value',
        render: (pack) => {
          const tradePack = tradePacks.find(p => p.originZoneId === pack.originZoneId && p.packTypeId === pack.packTypeId);
          const packValue = tradePack && tradePack.values.find(v => v.sellZoneId === pack.sellZoneId && v.region === this.props.region);

          if (!packValue) {
            return '--';
          }

          if (packValue.itemId) {
            return <ItemLink id={packValue.itemId} count={Math.round(packValue.value)} />;
          } else {
            return <Currency type={CURRENCY.COIN} count={packValue.value * 10000} />;
          }
        },
      },
      {
        label: 'Base Labor',
        render: (pack) => {
          const { craftLabor, sellLabor, harvestLabor, totalLabor } = this.calculatePackLabor(pack);

          if (totalLabor === 0) {
            return '--';
          }

          return (
            <Tooltip
              title={
                <Typography>
                  Craft: {craftLabor}<br />
                  {harvestLabor > 0 && <>Harvest: {harvestLabor}<br /></>}
                  Sell: {sellLabor}
                </Typography>
              }
            >
              <span>{totalLabor}</span>
            </Tooltip>
          );
        },
      },
      {
        label: 'Freshness',
        render: (pack, i) => {
          const profitLevels = this.getPackProfitLevels(pack);

          return (
            <Autocomplete
              autoHighlight
              blurOnSelect
              options={profitLevels}
              getOptionLabel={(option) => `${option.name} Profit: ${percentModifier(option.modifier)}`}
              onChange={(e, v) => this.updatePack(i, 'freshness')(v ? v.name : null)}
              value={profitLevels.find(level => level.name === pack.freshness) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  margin="dense"
                  placeholder="Select a freshness"
                  className="zone-name"
                />
              )}
              disabled={!pack.originZoneId || !pack.packTypeId || profitLevels.length === 0}
            />
          );
        },
      },
      {
        label: 'Demand',
        render: (pack, i) => (
          <div className="demand">
            <NumberField
              onChange={this.updatePack(i, 'demand')}
              value={pack.demand || PACK_PERCENT_MAX}
              min={PACK_PERCENT_MIN}
              max={PACK_PERCENT_MAX}
              endAdornment="%"
              style={{ width: 72 }}
            />
            {WAR_ZONE.includes(pack.sellZoneId) && pack.packTypeId &&
            pathOr(false, [pack.packTypeId, 'warBonus'])(packTypes) &&
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={pack.war || false}
                  onChange={(e, checked) => this.updatePack(i, 'war')(checked)}
                />
              }
              label="War (+15%)"
            />}
          </div>
        ),
      },
      {
        label: 'Value',
        render: (pack) => {
          const { value, item } = this.calculatePackValue(pack);

          if (value === 0) {
            return '--';
          }

          if (item) {
            return <ItemLink id={item} count={value} />;
          } else {
            return <Currency type={CURRENCY.COIN} count={value} />;
          }
        },
      },
      {
        label: 'Silver/Labor',
        render: (pack) => {
          const { value, item } = this.calculatePackValue(pack);
          const { totalLabor } = this.calculatePackLabor(pack);

          if (item || value === 0) {
            return '--';
          }

          return <Currency type={CURRENCY.COIN} count={value / totalLabor} />;
        },
      },
      {
        label: '',
        render: (_, i) => (
          <IconButton
            onClick={this.deletePack(i)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
  };

  addPack = () => {
    const { packs } = this.state;
    packs.push({});
    this.setState({ packs });
  };

  render() {
    const { open, onClose, mobile } = this.props;
    const { packs } = this.state;

    console.log('Packs', packs);

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        fullScreen={mobile}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Compare Trade Packs</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className="compare-packs">
          <Table
            size="small"
            stickyHeader
          >
            <TableBody>
              {this.tableRows.map((row, i) => (
                <TableRow
                  key={`compare-row-${row.label}`}
                >
                  <TableCell variant="head">{row.label}</TableCell>
                  {packs.map((pack, packId) => (
                    <React.Fragment key={`compare-cell-${row.label}-${packId}`}>
                      <TableCell>{row.render(pack, packId)}</TableCell>
                    </React.Fragment>
                  ))}
                  {i === 0 && packs.length < MAX_COMPARE &&
                  <TableCell rowSpan={this.tableRows.length}>
                    <Button onClick={this.addPack} tabIndex={100}>
                      <AddIcon />
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({
                           tradepacks: { region },
                           gameData: { tradePacks: { packs, types, freshness }, zones, continents, recipes },
                         }) => ({
  tradePacks: packs,
  packTypes: types,
  freshnessTypes: freshness,
  zones,
  continents,
  region,
  recipes,
});

const mapDispatchToProps = {
  calculateLabor,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackCompare);
