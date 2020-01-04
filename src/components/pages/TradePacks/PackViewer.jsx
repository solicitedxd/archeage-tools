import {
  AppBar,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
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
import {
  Close,
  ExpandMore,
} from '@material-ui/icons';
import {
  setCraftLarder,
  setDegradation,
  setFreshness,
  setInterest,
  setPercentage,
  setPrice,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
} from 'actions/tradepacks';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemLink from 'components/Item/ItemLink';
import { CURRENCY } from 'constants/items';
import {
  CONTINENT,
  ZONE,
} from 'constants/map';
import { PROFICIENCY } from 'constants/proficiencies';
import {
  CARGO,
  CARGO_OUTLET,
  CARGO_SUPPLY,
  NO_FRESHNESS,
  OUTLET_ZONE,
  PACK_TYPE,
  TRANSPORTATION_FUEL,
} from 'constants/tradepacks';
import ITEM from 'data/items';
import TRADE_PACKS, {
  MULTIPURPOSE_AGING_LARDER,
  PACK_COSTS,
} from 'data/tradepacks';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  oneOf,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { maxDecimals } from 'utils/thunderstruck';

const getZonePrefix = (zone) => {
  if ([CONTINENT.NUIA.name, CONTINENT.HARANYA.name].includes(zone)) {
    return `${zone}n`;
  }
  if ([ZONE.ARCUM_IRIS, ZONE.SILENT_FOREST, ZONE.WHITE_ARDEN, ZONE.TWO_CROWNS].includes(zone)) {
    return zone;
  }
  return zone.split(' ')[0];
};

class PackViewer extends Component {
  static propTypes = {
    open: bool.isRequired,
    onClose: func.isRequired,
    originZone: oneOf([...CONTINENT.HARANYA.zones, ...CONTINENT.NUIA.zones, CONTINENT.HARANYA.name,
      CONTINENT.NUIA.name]),
    packType: oneOf([...Object.values(PACK_TYPE), ...CARGO_OUTLET]),
    sellZone: oneOf([...OUTLET_ZONE, CARGO]),
  };

  static defaultProps = {
    originZone: null,
    packType: null,
    sellZone: null,
  };

  state = {
    transportExpand: false,
    unitSize: 1,
  };

  setTransportExpand = (transportExpand) => {
    this.setState({ transportExpand });
  };

  setUnitSize = (unitSize) => {
    this.setState({ unitSize });
  };

  getLaborCost = (cost, proficiency) => {
    const { proficiencies } = this.props;
    const proficiencyRank = PROFICIENCY.find(prof => prof.name === proficiencies[proficiency]);
    return Math.round(cost * proficiencyRank.cost);
  };

  render() {
    const { open, onClose, originZone, packType, sellZone } = this.props;
    const { transportExpand, unitSize } = this.state;
    const { craftLarder, degradeDemand, freshness: profitLevels, showInterest, percentage: percentageDefault, percentages, prices, quantities, supply, transportationQty, war } = this.props;
    const { setCraftLarder, setDegradation, setFreshness, setInterest, setPercentage, setPrice, setQuantity, setSupply, setTransportationQuantity, setWar } = this.props;

    // do nothing if value is missing
    if (originZone === null || packType === null || sellZone === null) return null;

    const packCosts = PACK_COSTS[packType] || {};

    // spread the costs into the pack details first, to allow individual packs to overwrite costs
    const pack = { ...packCosts, ...pathOr({}, [originZone, 'packs', packType])(TRADE_PACKS) };
    const freshness = pathOr({}, [originZone, 'freshness'])(TRADE_PACKS);
    const profitLevel = pathOr('HIGH', [originZone, packType, sellZone])(profitLevels);
    const supplyLevel = sellZone === CARGO && (supply[originZone] || Object.keys(CARGO_SUPPLY)[0]);
    const quantity = pathOr(1, [originZone, packType])(quantities);

    const percentage = pathOr(percentageDefault, [originZone, packType, sellZone])(percentages);

    if (packCosts.materials && packCosts.materials !== pack.materials) {
      pack.materials = [].concat(pack.materials, packCosts.materials);
    }

    // construct a pack name, if no special name is given
    let packName = pack.name;
    if (!packName) {
      if (sellZone === CARGO) {
        packName = `${getZonePrefix(originZone)} Cargo`;
      } else if (packType === PACK_TYPE.BLUE_SALT) {
        packName = `${getZonePrefix(originZone)} Pack`;
      } else if (packType === PACK_TYPE.ANTIQUITIES) {
        packName = `${getZonePrefix(originZone)} ${packType}`;
      } else {
        packName = `${getZonePrefix(originZone)} ${freshness.name}`;
        if (packType === PACK_TYPE.SALVE || packType === PACK_TYPE.CHEESE || packType === PACK_TYPE.HONEY) {
          packName += ` Aged ${packType}`;
        } else {
          if (packType !== PACK_TYPE.NORMAL) {
            packName += ` ${packType}`;
          }
          packName += ' Specialty';
        }
      }
    }

    let interest;
    let packValue = pack.sell[sellZone];
    // modify the pack's value
    if (packValue) {
      // modify the percentage
      let demand = 0;
      if (degradeDemand) {
        let degrade = 0;
        for (let i = 1; i <= quantity; i++) {
          demand += ((percentage - degrade) / 130);
          if (i % 4 === 0) {
            degrade++;
          }
        }
      } else {
        demand = (percentage / 130);
        packValue *= quantity;
      }
      // modify the freshness
      if (freshness[profitLevel] && !NO_FRESHNESS.includes(packType)) {
        packValue *= freshness[profitLevel].modifier;
      }
      // modify war bonus
      if (war[sellZone]) {
        packValue *= 1.15;
      }
      interest = Math.round(packValue * .02 * 10000);
      if (showInterest) {
        packValue *= 1.02;
      }
      if (pack.item) {
        packValue = Math.round(packValue);
      } else {
        packValue = Math.round(packValue * 10000);
      }
      packValue = Math.round(packValue * demand);
    } else {
      packValue = 0;
    }

    const larderItem = pack.materials && pack.materials.find(mat => mat.item === ITEM.MULTI_PURPOSE_AGING_LARDER);
    const isAgedPack = Boolean(larderItem);

    let { labor, gold, sellLabor } = pack;

    // sell labor
    let totalLabor = this.getLaborCost(sellLabor, 'commerce');
    // craft labor
    totalLabor += this.getLaborCost(labor, isAgedPack ? 'husbandry' : 'commerce');

    const materials = pack.materials ? [...pack.materials] : [];
    if (isAgedPack && craftLarder) {
      const larderIndex = pack.materials.indexOf(larderItem);
      MULTIPURPOSE_AGING_LARDER.materials.forEach((mat, i) =>
        materials.splice(larderIndex + 1 + i, 0, { ...mat, indent: true }),
      );
      gold += MULTIPURPOSE_AGING_LARDER.gold;
      totalLabor += this.getLaborCost(MULTIPURPOSE_AGING_LARDER.labor, 'husbandry');
    }
    let totalGold = gold;
    materials.forEach(mat => {
      if (mat.item === ITEM.MULTI_PURPOSE_AGING_LARDER && craftLarder) {
        return;
      }
      totalGold += (prices[mat.item.name] || 0) * 10000 * mat.count;
    });
    if (sellZone === CARGO) {
      totalGold = CARGO_SUPPLY[supplyLevel].price;
    }
    totalGold = Math.round(totalGold);

    // increase total labor and gold cost by quantity
    totalLabor *= quantity;
    totalGold *= quantity;

    const transportCosts = {};
    TRANSPORTATION_FUEL.forEach((item) => {
      transportCosts[item.name] = Math.round((prices[item.name] || 0) * pathOr(0, [originZone, sellZone,
        item.name])(transportationQty) * 10000);
    });

    const transportTotal = Object.values(transportCosts).reduce((a, b) => a + b);

    const profit = packValue - totalGold - transportTotal;

    const itemShowCost = (material) => (
      (!material.item.bindsOnPickup || material.item.allowPricing) &&
      ((material.item === ITEM.MULTI_PURPOSE_AGING_LARDER && !craftLarder) || (material.item !== ITEM.MULTI_PURPOSE_AGING_LARDER)));

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{packName}</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className="body-container">
          <div className="pack-header">
            <Typography variant="h6">{sellZone === CARGO ? 'Purchasing Cargo' : 'Crafting Requirements'}</Typography>
            <div className="pack-quantity">
              <Typography variant="caption" color="primary">Quantity:</Typography>
              <TextField
                id="pack-qty"
                hiddenLabel
                type="number"
                margin="none"
                InputProps={{
                  min: 0,
                  max: 999,
                }}
                value={quantity}
                onChange={setQuantity(originZone, packType)}
              />
            </div>
            <Tooltip title={
              <React.Fragment>
                <Typography variant="body2">Calculate Demand Degradation</Typography>
                <Typography variant="caption">For every 4 packs, the demand will be reduced by 1%.</Typography>
              </React.Fragment>
            }>
              <Checkbox
                checked={degradeDemand}
                onChange={setDegradation}
                color="primary"
              />
            </Tooltip>
          </div>
          {sellZone !== CARGO &&
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  Item
                </TableCell>
                <TableCell align="right">
                  <Select
                    value={unitSize}
                    onChange={(e) => this.setUnitSize(e.target.value)}
                  >
                    <MenuItem value={1}>Gold per unit</MenuItem>
                    <MenuItem value={10}>Gold per 10 units</MenuItem>
                    <MenuItem value={100}>Gold per 100 units</MenuItem>
                  </Select>
                </TableCell>
                {isAgedPack &&
                <TableCell align="right">
                  Craft?
                </TableCell>}
                <TableCell align="right">
                  Quantity
                </TableCell>
                <TableCell align="right">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map(material => (
                <TableRow key={`material-${material.item.name}`}>
                  <TableCell>
                    {material.indent &&
                    <span className="material-indent" />}
                    <ItemLink item={material.item} />
                  </TableCell>
                  <TableCell align="right">
                    {itemShowCost(material) ?
                      <Input
                        id={`mat-cost-${material.item.name}`}
                        value={maxDecimals(Number(prices[material.item.name] || 0) * unitSize, 4)}
                        onChange={setPrice(material.item.name, unitSize)}
                        type="number"
                        inputProps={{
                          style: { textAlign: 'right', width: 120 },
                          min: 0,
                          max: 10000,
                          step: 0.0001,
                        }}
                        endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      /> :
                      '--'}
                  </TableCell>
                  {isAgedPack &&
                  <TableCell>
                    {material.item === ITEM.MULTI_PURPOSE_AGING_LARDER &&
                    <Checkbox
                      checked={craftLarder}
                      onChange={setCraftLarder}
                      color="primary"
                    />}
                  </TableCell>}
                  <TableCell align="right">
                    {quantity > 1 ?
                      <Tooltip title={`${material.count} per pack`}>
                        <span>{material.count * quantity}</span>
                      </Tooltip> :
                      material.count
                    }
                  </TableCell>
                  <TableCell align="right">
                    {itemShowCost(material) ?
                      <Currency
                        type={CURRENCY.COIN}
                        count={Math.round((prices[material.item.name] || 0) * 10000 * material.count * quantity)}
                      /> :
                      '--'}
                  </TableCell>
                </TableRow>
              ))}
              {gold > 0 &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Craft Cost</TableCell>
                <TableCell align="right"><Currency type={CURRENCY.COIN} count={gold * quantity} /></TableCell>
              </TableRow>}
              {isAgedPack && craftLarder &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Craft Labor</TableCell>
                <TableCell align="right">
                  {this.getLaborCost(MULTIPURPOSE_AGING_LARDER.labor, 'husbandry') * quantity}
                </TableCell>
              </TableRow>}
              {labor > 0 &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>
                  {isAgedPack ? 'Harvest Labor' : 'Craft Labor'}
                </TableCell>
                <TableCell align="right">
                  {this.getLaborCost(labor, isAgedPack ? 'husbandry' : 'commerce') * quantity}
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>}
          {sellZone !== CARGO &&
          <React.Fragment>
            <div className="pack-header">
              <Typography variant="h6" style={{ margin: '8px 0 4px' }}>
                Transporting to {sellZone}
              </Typography>
              <IconButton className="collapse-btn" onClick={() => this.setTransportExpand(!transportExpand)}>
                <ExpandMore
                  className={transportExpand ? 'collapsed' : 'expanded'}
                />
              </IconButton>
            </div>
            <Collapse in={transportExpand}>
              <div className="transport">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Fuel Item
                      </TableCell>
                      <TableCell align="right">
                        Gold per unit
                      </TableCell>
                      <TableCell align="right">
                        Quantity
                      </TableCell>
                      <TableCell align="right">
                        Total Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TRANSPORTATION_FUEL.map((item, i) => (
                      <TableRow key={`transportation-${item.name}-${i}`}>
                        <TableCell>
                          <ItemLink item={item} />
                        </TableCell>
                        <TableCell align="right">
                          <Input
                            id={`transp-mat-cost-${item.name}`}
                            value={maxDecimals(prices[item.name] || 0, 4)}
                            onChange={setPrice(item.name)}
                            type="number"
                            inputProps={{
                              style: { textAlign: 'right', width: 120 },
                              min: 0,
                              max: 10000,
                              step: 0.0001,
                            }}
                            endAdornment={<InputAdornment position="end">g</InputAdornment>}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id={`transp-mat-qty-${item.name}`}
                            hiddenLabel
                            type="number"
                            margin="none"
                            InputProps={{
                              min: 0,
                              max: 99,
                            }}
                            className="quantity"
                            value={pathOr(0, [originZone, sellZone, item.name])(transportationQty)}
                            onChange={setTransportationQuantity(originZone, sellZone, item.name)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Currency type={CURRENCY.COIN} count={transportCosts[item.name]} />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell>Total Cost</TableCell>
                      <TableCell align="right">
                        <Currency type={CURRENCY.COIN} count={transportTotal} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Collapse>
          </React.Fragment>
          }
          {sellZone === CARGO &&
          <div className="sell-config">
            <FormControl>
              <InputLabel>Supply</InputLabel>
              <Select
                id="select-profit"
                value={supplyLevel}
                onChange={setSupply(originZone)}
                renderValue={() =>
                  <Typography>
                    {supplyLevel.substr(0, 1)}{supplyLevel.toLowerCase().substr(1)} Supply:&nbsp;
                    {CARGO_SUPPLY[supplyLevel].percent}%
                  </Typography>}
              >
                {Object.keys(CARGO_SUPPLY).filter(k => k !== 'name').map(supplyLevel => (
                  <MenuItem key={supplyLevel}>
                    {supplyLevel.substr(0, 1)}{supplyLevel.toLowerCase().substr(1)} Supply:&nbsp;
                    {CARGO_SUPPLY[supplyLevel].percent}%
                    &nbsp;<Currency type={CURRENCY.COIN} count={CARGO_SUPPLY[supplyLevel].price} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Table size="small" style={{ width: 185 }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Pack Cost
                  </TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={CARGO_SUPPLY[supplyLevel].price} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Labor Cost
                  </TableCell>
                  <TableCell align="right">
                    {this.getLaborCost(labor, 'commerce')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          }
          <Typography variant="h6" style={{ margin: '8px 0 4px' }}>Selling at {sellZone === CARGO ? packType
            : sellZone}</Typography>
          <div className="sell-config">
            <div>
              <InputLabel shrink>Demand: {percentage}%</InputLabel>
              <Slider
                onChange={setPercentage(originZone, packType, sellZone)}
                value={percentage}
                defaultValue={130}
                min={50}
                max={130}
                step={1}
              />
              {!NO_FRESHNESS.includes(packType) &&
              <FormControl style={{ minWidth: 170 }}>
                <InputLabel>[{freshness.name}] Freshness</InputLabel>
                <Select
                  id="select-profit"
                  value={profitLevel}
                  onChange={setFreshness(originZone, packType, sellZone)}
                  renderValue={() =>
                    <Typography>
                      {profitLevel.substr(0, 1)}{profitLevel.toLowerCase().substr(1)} Profit:&nbsp;
                      {freshness[profitLevel].modifier >= 1 && `+${Math.round((freshness[profitLevel].modifier - 1) * 100)}%`}
                      {freshness[profitLevel].modifier < 1 && `-${Math.round((1 - freshness[profitLevel].modifier) * 100)}%`}
                    </Typography>}
                >
                  {Object.keys(freshness).filter(k => k !== 'name').map(profitLevel => (
                    <MenuItem key={profitLevel}>
                      {profitLevel.substr(0, 1)}{profitLevel.toLowerCase().substr(1)} Profit:&nbsp;
                      {freshness[profitLevel].modifier >= 1 && `+${Math.round((freshness[profitLevel].modifier - 1) * 100)}%`}
                      {freshness[profitLevel].modifier < 1 && `-${Math.round((1 - freshness[profitLevel].modifier) * 100)}%`}
                      &nbsp;({freshness[profitLevel].time})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>}
              {(sellZone === ZONE.YNYSTERE || sellZone === ZONE.CINDERSTONE_MOOR) &&
              <FormControlLabel
                control={
                  <Checkbox
                    checked={war[sellZone] || false}
                    onChange={setWar(sellZone)}
                    color="primary"
                  />
                }
                label="Zone in War (+15%)"
              />}
              {sellZone !== CARGO ?
                <Tooltip title={<Currency type={CURRENCY.COIN} count={interest} />}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showInterest}
                        onChange={setInterest}
                        color="primary"
                      />
                    }
                    label="Interest (+2%)"
                  />
                </Tooltip> :
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showInterest}
                      onChange={setInterest}
                      color="primary"
                    />
                  }
                  label="Interest (+2%)"
                />}
            </div>
            <Table size="small" className="totals-table">
              <TableBody>
                <TableRow>
                  <TableCell>Sell Labor</TableCell>
                  <TableCell align="right">
                    {this.getLaborCost(sellLabor, 'commerce') * quantity}
                  </TableCell>
                  <TableCell>Sell Value</TableCell>
                  <TableCell align="right">
                    {sellZone === CARGO && pack.item ?
                      <React.Fragment>
                        {packValue}&nbsp;
                        <Item {...pack.item} className="inline" />
                      </React.Fragment> :
                      <Currency type={CURRENCY.COIN} count={packValue} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Labor</TableCell>
                  <TableCell align="right">
                    {totalLabor}
                  </TableCell>
                  <TableCell>Total Cost</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={totalGold} />
                  </TableCell>
                </TableRow>
                <TableRow>
                </TableRow>
                {sellZone !== CARGO &&
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell>Profit</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={profit} />
                  </TableCell>
                </TableRow>}
                {sellZone !== CARGO &&
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell>Silver per Labor</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={Math.round((profit) / totalLabor)} />
                  </TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ tradepacks }) => ({
  ...tradepacks,
});

const mapDispatchToProps = {
  setCraftLarder,
  setDegradation,
  setFreshness,
  setInterest,
  setPercentage,
  setPrice,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackViewer);
