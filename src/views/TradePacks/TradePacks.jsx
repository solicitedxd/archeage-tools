import {
  AppBar,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ReplayIcon from '@material-ui/icons/Replay';
import { openDialog } from 'actions/display';
import {
  fetchContinents,
  fetchTradePacks,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import {
  resetSettings,
  setOutlet,
  setPackRegion,
  setPackTable,
  setPercentage,
  setWar,
} from 'actions/tradepacks';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Item from 'components/Item';
import NumberField from 'components/NumberField';
import {
  DIALOG_MY_GAME,
  PROFICIENCIES,
} from 'constants/display';
import {
  CONTINENT,
  ZONE,
} from 'constants/map';
import {
  CONTINENT_PACKS,
  FRESHNESS,
  OUTLET_ZONE,
  PACK_PERCENT_MAX,
  PACK_PERCENT_MIN,
  PACK_REGIONS,
  PACK_TABLE,
  PACK_TYPE,
} from 'constants/tradepacks';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { uniqueValues } from 'utils/array';
import {
  setTitle,
  slug,
} from 'utils/string';
import {
  mapContinentToCargo,
  mapContinentToTable,
} from 'utils/tradepacks';
import FreshnessBlip from './FreshnessBlip';
import MaterialPrices from './MaterialPrices';
import PackCompare from './PackCompare';
import PackViewer from './PackViewer';

class TradePacks extends Component {
  static propTypes = {
    setOutlet: func.isRequired,
    setPackTable: func.isRequired,
    resetSettings: func.isRequired,
    setPercentage: func.isRequired,
    setWar: func.isRequired,
    openDialog: func.isRequired,
    mobile: bool,
    packTable: number,
    percentage: number,
    war: object,
    outlet: number,
    region: string,
    setPackRegion: func.isRequired,
    fetchContinents: func.isRequired,
    fetchTradePacks: func.isRequired,
    packs: array,
    freshness: object,
    types: object,
    continents: object,
    zones: object,
    match: object,
    location: object,
  };

  static defaultProps = {
    region: 'NA',
    packs: [],
    freshness: {},
    types: {},
  };

  state = {
    reset: false,
    prices: false,
    compare: false,
  };

  setZone = this.props.setOutlet;

  componentDidMount() {
    this.props.fetchContinents();
    this.props.fetchTradePacks();
  }

  setPackTable = (e, value) => {
    this.props.setPackTable(e, value);
    this.props.setOutlet(e, 0);
  };

  requestReset = () => {
    this.setState({ reset: true });
  };

  cancelReset = () => {
    this.setState({ reset: false });
  };

  handleReset = () => {
    this.props.resetSettings();
    this.cancelReset();
  };

  onOpenViewer = (originZoneId, packType) => {
    const { continents, zones, types, outlet, packTable } = this.props;
    const outletZones = OUTLET_ZONE[packTable];
    const sellZoneId = outletZones[outlet] || false;

    const path = [];
    let to;

    if (packTable === PACK_TABLE.CARGO) {
      path.push(slug(continents[originZoneId].name));
      path.push(slug(types[PACK_TYPE.CARGO].name));
      to = slug(zones[packType].name);
    } else {
      path.push(slug(zones[originZoneId].name));
      path.push(slug(types[packType].name));
      to = slug(zones[sellZoneId].name);
    }

    push(`/trade-packs/${path.join('/')}?to=${to}`);
  };

  onCloseViewer = () => {
    push('/trade-packs');
  };

  togglePrices = () => {
    this.setState({ prices: !this.state.prices });
  };

  toggleCompare = () => {
    this.setState({ compare: !this.state.compare });
  };

  render() {
    const { mobile, packTable, percentage, war, outlet, region, match, location } = this.props;
    const { setPercentage, setWar, openDialog, setPackRegion } = this.props;
    const { packs: tradePackData, freshness: freshnessData, types: packTypes, continents, zones } = this.props;
    const { reset, prices, compare } = this.state;

    const isCargo = packTable === PACK_TABLE.CARGO;

    const outletZones = OUTLET_ZONE[packTable];
    const sellZoneId = outletZones[outlet];

    let continentZones;
    if (!isCargo) {
      // only filter out unused zones for Auroria packs
      let packZoneData = packTable === PACK_TABLE.AURORIA
        ? tradePackData.filter(p => p.values.find(pV => pV.sellZoneId === sellZoneId)) : tradePackData;
      // create list of zones that have packs
      continentZones = uniqueValues(packZoneData.map(p => p.originZoneId)).filter(zId => continents[packTable].zones.includes(zId));
    } else {
      continentZones = [CONTINENT.HARANYA, CONTINENT.NUIA, CONTINENT.AURORIA];
    }

    setTitle('Trade Pack Calculator');

    // find pack that's opened by the viewer
    let viewerPack;
    const { originZoneName, packTypeName } = match.params;
    const sellZoneName = new URLSearchParams(location.search).get('to');
    const viewerPackType = Object.values(packTypes).find(type => slug(type.name) === packTypeName);
    if (viewerPackType) {
      let viewerPackZone = Object.values(zones).find(zone => slug(zone.name) === originZoneName);
      if (viewerPackType.id === PACK_TYPE.CARGO) {
        viewerPackZone = Object.values(continents).find(cont => slug(cont.name) === originZoneName);
        viewerPackZone = zones[mapContinentToCargo(viewerPackZone.id)];
      }
      viewerPack = tradePackData.find(pack => pack.originZoneId === viewerPackZone.id && pack.packTypeId === viewerPackType.id);
    }
    const viewerSellZoneId = (Object.values(zones).find(zone => slug(zone.name) === sellZoneName) || {}).id;

    const cPackTypes = CONTINENT_PACKS[packTable];
    const currentPackTypes = Array.isArray(cPackTypes) ? cPackTypes : cPackTypes[sellZoneId];

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant={mobile ? 'h6' : 'h5'} className="title-text">Trade Pack Calculator</Typography>
              <Tooltip title="Configure Proficiency">
                <IconButton
                  color="inherit"
                  aria-label="Proficiencies"
                  onClick={() => openDialog(DIALOG_MY_GAME, PROFICIENCIES)}
                >
                  <ListAltIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset All Settings">
                <IconButton color="inherit" aria-label="Reset" onClick={this.requestReset}>
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
              <FormControl className="color-white">
                <InputLabel id="region-label">Publisher</InputLabel>
                <Select
                  labelId="region-label"
                  id="region-select"
                  value={region}
                  onChange={(e) => setPackRegion(e.target.value)}
                  className="region-opt"
                >
                  {Object.entries(PACK_REGIONS).map(([region, publisher]) => (
                    <MenuItem key={`region-${region}`} value={region}>{publisher}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Toolbar>
          </AppBar>
          <div className="tradepack-settings">
            <FormControl className="select-group">
              <InputLabel className="group-label" shrink>Pack Continent</InputLabel>
              <ButtonGroup>
                {Object.values(PACK_TABLE)
                .map(contId => (
                  <Button
                    key={`cont-${contId}`}
                    variant={packTable === contId ? 'contained' : 'outlined'}
                    color={packTable === contId ? 'primary' : null}
                    className={cn({ selected: packTable === contId })}
                    onClick={(e) => this.setPackTable(e, contId)}
                  >
                    {contId === PACK_TABLE.CARGO ? 'Cargo' : pathOr('...', [contId, 'name'])(continents)}
                  </Button>
                ))}
              </ButtonGroup>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={war[sellZoneId] || false}
                  onChange={setWar(sellZoneId)}
                  disabled={isCargo || outlet !== 2}
                />
              }
              label="War (+15%)"
            />
            <Button
              startIcon={<LocalAtmIcon />}
              onClick={this.togglePrices}
            >
              Material Prices
            </Button>
            <div className="pack-percentage">
              <NumberField
                label="Pack Demands"
                onChange={setPercentage(null, null)}
                value={percentage}
                min={PACK_PERCENT_MIN}
                max={PACK_PERCENT_MAX}
                endAdornment="%"
              />
            </div>
          </div>
        </Paper>
        <Dialog open={reset}>
          <DialogTitle>Reset all settings?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to reset all settings?<br />
              This will clear all saved pack percentages, item quantities, and freshness selections. It will not clear
              item prices.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelReset}>Cancel</Button>
            <Button color="primary" onClick={this.handleReset}>Confirm</Button>
          </DialogActions>
        </Dialog>
        {mobile &&
        <AdContainer type="horizontal" />}
        {tradePackData.length === 0 &&
        <CircularProgress size={72} style={{ display: 'block', margin: 'auto' }} />}
        {tradePackData.length > 0 &&
        <Paper className="section">
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              {!isCargo &&
              <Tabs
                value={outlet}
                onChange={this.setZone}
                className="title-text"
                variant={mobile ? 'scrollable' : 'standard'}
              >
                {outletZones.map(zoneId => (
                  <Tab key={`${packTable}-${zoneId}`} label={zones[zoneId].name} />
                ))}
              </Tabs>}
              {isCargo &&
              <Typography variant="subtitle1" className="title-text">Cargo</Typography>}
              <Tooltip title="Compare Trade Packs">
                <IconButton
                  color="inherit"
                  onClick={this.toggleCompare}
                >
                  <CompareArrowsIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <div style={{ overflow: 'auto' }}>
            <Table size="small" className="trade-table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {!isCargo && 'Pack Origin'}
                  </TableCell>
                  {currentPackTypes.map(packTypeId => (
                    <TableCell
                      key={`type-head-${packTypeId}`}
                      align="center"
                    >
                      {isCargo ? zones[packTypeId].name : packTypes[packTypeId].name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {continentZones.map(originZoneId => {
                  let freshness;
                  if (isCargo) {
                    freshness = freshnessData[FRESHNESS.CARGO];
                  } else if (packTable === PACK_TABLE.AURORIA && sellZoneId === ZONE.SUNSPECK_SEA) {
                    freshness = freshnessData[FRESHNESS.DISGUISED];
                  } else {
                    freshness = Object.values(freshnessData).find(f => f.zoneIds.includes(originZoneId));
                  }
                  const zoneName = !isCargo ? zones[originZoneId].name : `${continents[originZoneId].name}n Cargo`;
                  return (
                    <TableRow
                      key={`pack-row-${originZoneId}`}
                      className={freshness.name}
                    >
                      <TableCell
                        className={cn({ 'no-pack': originZoneId === sellZoneId })}
                      >
                        {zoneName}
                      </TableCell>
                      {currentPackTypes.map(packTypeId => {
                        const packType = isCargo ? packTypes[PACK_TYPE.CARGO] : packTypes[packTypeId];
                        const pack = tradePackData.find(p => isCargo
                          ? (p.packTypeId === PACK_TYPE.CARGO && p.originZoneId === mapContinentToCargo(originZoneId))
                          : (p.originZoneId === originZoneId && p.packTypeId === packTypeId));

                        let { value: packValue, itemId } = pathOr([], ['values'])(pack)
                        .find(v => v.sellZoneId === (isCargo ? packTypeId
                          : sellZoneId) && v.region === region) || {};
                        // modify the pack's value
                        if (packValue) {
                          // modify the percentage
                          packValue = packValue * (percentage / 130);

                          // modify the freshness
                          if (packType.freshness) {
                            const packFreshness = freshness.profitLevels.find(pL => pL.name === 'High' && pL.aged === packType.aged) || freshness.profitLevels[0];
                            packValue *= packFreshness.modifier;
                          }

                          // modify war bonus
                          if (war[sellZoneId] && packType.warBonus) {
                            packValue *= 1.15;
                          }

                          // round to fixed 4 decimal
                          packValue = (Math.round(packValue * 10000) / 10000).toFixed(4);
                        }

                        const isPack = originZoneId !== sellZoneId && packValue;
                        let displayValue = isPack ? `${packValue}g` : '--';
                        if (isPack && itemId) {
                          displayValue = <>
                            {Math.round(packValue)}&nbsp;
                            <Item id={itemId} inline />
                          </>;
                        }

                        const cell = (
                          <TableCell
                            key={`pack-${originZoneId}-${packTypeId}`}
                            align="right"
                            className={cn({ 'no-pack': !isPack })}
                            onClick={isPack ? () => this.onOpenViewer(originZoneId, packTypeId) : null}
                          >
                            {displayValue}
                          </TableCell>
                        );

                        if (!isPack) return cell;

                        return (
                          <Tooltip
                            title={`Customize ${!isCargo
                              ? `${(pack && pack.name) || `${zones[originZoneId].name} ${packTypes[packTypeId].name}`} -> ${zones[sellZoneId].name}`
                              : `${continents[originZoneId].name}n Cargo -> ${zones[packTypeId].name}`}`}
                            key={`pack-${originZoneId}-${packTypeId}`}
                            classes={{ tooltip: 'nowrap' }}
                          >
                            {cell}
                          </Tooltip>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="trade-footer body-container">
            {isCargo &&
            <FreshnessBlip {...freshnessData[FRESHNESS.CARGO]} />}
            {[PACK_TABLE.NUIA, PACK_TABLE.HARANYA].includes(packTable) &&
            <>
              <FreshnessBlip {...freshnessData[FRESHNESS.LUXURY]} />
              <FreshnessBlip {...freshnessData[FRESHNESS.FINE]} />
              <FreshnessBlip {...freshnessData[FRESHNESS.COMMERCIAL]} />
              <FreshnessBlip {...freshnessData[FRESHNESS.PRESERVED]} />
            </>}
            {packTable === PACK_TABLE.AURORIA && sellZoneId === ZONE.HEEDMAR &&
            <FreshnessBlip {...freshnessData[FRESHNESS.COASTAL]} />}
            {packTable === PACK_TABLE.AURORIA && sellZoneId === ZONE.SUNSPECK_SEA &&
            <FreshnessBlip {...freshnessData[FRESHNESS.DISGUISED]} />}
            <Typography variant="overline">
              Prices shown at {percentage}% demand with high profit{war[sellZoneId] ? ' and +15% war bonus' : ''}. 2%
              interest is not shown.
            </Typography>
          </div>
        </Paper>}
        <PackViewer
          pack={viewerPack}
          sellZoneId={viewerSellZoneId}
          onClose={this.onCloseViewer}
        />
        <MaterialPrices
          onClose={this.togglePrices}
          open={prices}
        />
        <PackCompare
          onClose={this.toggleCompare}
          open={compare}
        />
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({
                           display: { mobile },
                           tradepacks: { packTable, continent, percentage, war, outlet, region },
                           gameData: { tradePacks, continents, zones },
                         }) => ({
  mobile,
  packTable: packTable || mapContinentToTable(continent),
  outlet,
  percentage,
  war,
  region,
  ...tradePacks,
  continents,
  zones,
});

const mapDispatchToProps = {
  setPackTable,
  setOutlet,
  setPercentage,
  setWar,
  resetSettings,
  openDialog,
  setPackRegion,
  fetchContinents,
  fetchTradePacks,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradePacks);
