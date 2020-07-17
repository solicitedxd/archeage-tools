import {
  AppBar,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchRecipe } from 'actions/gameData';
import { calculateLabor } from 'actions/proficiencies';
import {
  setCraftLarder,
  setDegradation,
  setFreshness,
  setInterest,
  setPercentage,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
} from 'actions/tradepacks';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import NumberField from 'components/NumberField';
import { CURRENCY } from 'constants/items';
import {
  CONTINENT,
  ZONE,
} from 'constants/map';
import {
  COMMERCE,
  HUSBANDRY,
} from 'constants/proficiencies';
import {
  AGED_PACK,
  AGED_PACK_RECIPE,
  BUY_CARGO_LABOR,
  CARGO,
  CARGO_OUTLET,
  CARGO_SUPPLY,
  LARDER_HARVEST_LABOR,
  NO_FRESHNESS,
  OUTLET_ZONE,
  PACK_TYPE,
  SELL_CARGO_LABOR,
  SELL_LABOR,
  TRANSPORTATION_FUEL,
} from 'constants/tradepacks';
import TRADE_PACKS from 'data/tradepacks';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
  oneOf,
} from 'react-proptypes';
import { connect } from 'react-redux';

const getZonePrefix = (zone) => {
  if ([CONTINENT.NUIA.name, CONTINENT.HARANYA.name].includes(zone)) {
    return `${zone}n`;
  }
  if ([ZONE.ARCUM_IRIS, ZONE.SILENT_FOREST, ZONE.WHITE_ARDEN, ZONE.TWO_CROWNS].includes(zone)) {
    return zone;
  }
  return zone.split(' ')[0];
};

const getPackRecipe = ({ originZone, packType }) => {
  const recipeId = pathOr(null, [originZone, 'packs', packType, 'recipeId'])(TRADE_PACKS);
  return recipeId === null ? AGED_PACK_RECIPE[packType] || null : recipeId;
};

class PackViewer extends Component {
  static propTypes = {
    open: bool.isRequired,
    onClose: func.isRequired,
    originZone: oneOf([...CONTINENT.HARANYA.zones, ...CONTINENT.NUIA.zones, CONTINENT.HARANYA.name,
      CONTINENT.NUIA.name]),
    packType: oneOf([...Object.values(PACK_TYPE), ...CARGO_OUTLET]),
    sellZone: oneOf([...OUTLET_ZONE, CARGO]),
    recipe: object,
    craftLarder: bool,
    degradeDemand: bool,
    freshness: object,
    showInterest: bool,
    percentage: number,
    percentages: object,
    prices: object,
    quantities: object,
    supply: object,
    mobile: bool,
    transportationQty: object,
    war: object,
    setCraftLarder: func.isRequired,
    setDegradation: func.isRequired,
    setFreshness: func.isRequired,
    setInterest: func.isRequired,
    setPercentage: func.isRequired,
    setQuantity: func.isRequired,
    setSupply: func.isRequired,
    setTransportationQuantity: func.isRequired,
    setWar: func.isRequired,
    calculateLabor: func.isRequired,
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

  // eslint-disable-next-line class-methods-use-this
  UNSAFE_componentWillReceiveProps(nextProps) {
    const packRecipe = getPackRecipe(nextProps);
    if (packRecipe) {
      fetchRecipe(packRecipe);
    }
  }

  setTransportExpand = (transportExpand) => {
    this.setState({ transportExpand });
  };

  setUnitSize = (unitSize) => {
    this.setState({ unitSize });
  };

  // eslint-disable-next-line complexity
  render() {
    const { open, onClose, originZone, packType, sellZone, recipe } = this.props;
    const { transportExpand, unitSize } = this.state;
    const { craftLarder, degradeDemand, freshness: profitLevels, showInterest, percentage: percentageDefault, percentages, prices, quantities, supply, mobile, transportationQty, war } = this.props;
    const { setCraftLarder, setDegradation, setFreshness, setInterest, setPercentage, setQuantity, setSupply, setTransportationQuantity, setWar, calculateLabor } = this.props;

    // do nothing if value is missing
    if (originZone === null || packType === null || sellZone === null) return null;

    // spread the costs into the pack details first, to allow individual packs to overwrite costs
    const pack = pathOr({}, [originZone, 'packs', packType])(TRADE_PACKS);
    const freshness = pathOr({}, [originZone, 'freshness'])(TRADE_PACKS);
    const freshnessLevels = freshness[AGED_PACK.includes(packType) ? 'AGED' : 'STANDARD'] || {};
    const profitLevel = pathOr('HIGH', [originZone, packType, sellZone])(profitLevels);
    const supplyLevel = sellZone === CARGO && (supply[originZone] || Object.keys(CARGO_SUPPLY)[0]);
    const quantity = pathOr(1, [originZone, packType])(quantities);

    const percentage = pathOr(percentageDefault, [originZone, packType, sellZone])(percentages);
    const isAgedPack = AGED_PACK.includes(packType);
    const sellLabor = sellZone === CARGO ? SELL_CARGO_LABOR : SELL_LABOR;

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
            degrade += 1;
          }
        }
      } else {
        demand = (percentage / 130);
        packValue *= quantity;
      }
      // modify the freshness
      if (freshnessLevels[profitLevel] && !NO_FRESHNESS.includes(packType)) {
        packValue *= freshnessLevels[profitLevel].modifier;
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

    // sell labor
    let totalLabor = calculateLabor(sellLabor, recipe.vocation);

    // define initial
    let materials = recipe.materials || [];
    let craftGold;
    let craftLabor = isAgedPack
      ? calculateLabor(LARDER_HARVEST_LABOR, HUSBANDRY)
      : calculateLabor(recipe.labor, recipe.vocation);
    // cargo pack, modify
    if (sellZone === CARGO) {
      craftLabor = calculateLabor(BUY_CARGO_LABOR, COMMERCE);
    }
    let totalGold = 0;

    if (isAgedPack && recipe.item) {
      materials = [{ item: recipe.item, quantity: 1 }];
      craftGold = 0;
    } else {
      craftGold = recipe.gold;
    }
    if (isAgedPack && craftLarder) {
      (recipe.materials || []).forEach((mat) => materials.push({ ...mat, indent: true }));
      craftGold += recipe.gold;
      totalLabor += calculateLabor(recipe.labor, recipe.vocation);
    }

    totalGold += craftGold;
    totalLabor += craftLabor;

    materials.forEach(mat => {
      if (!mat.indent && craftLarder && isAgedPack) return;
      totalGold += (prices[mat.item] || 0) * 10000 * mat.quantity;
    });
    if (sellZone === CARGO) {
      totalGold = CARGO_SUPPLY[supplyLevel].price;
    }
    totalGold = Math.round(totalGold);

    // increase total labor and gold cost by quantity
    totalLabor *= quantity;
    totalGold *= quantity;

    const transportCosts = {};
    TRANSPORTATION_FUEL.forEach((itemId) => {
      transportCosts[itemId] = Math.round((prices[itemId] || 0) * pathOr(0, [originZone, sellZone,
        itemId])(transportationQty) * 10000);
    });

    const transportTotal = Object.values(transportCosts).reduce((a, b) => a + b);
    totalGold += transportTotal;

    const profit = packValue - totalGold;

    const showItemCost = (material) => (!isAgedPack || (isAgedPack && ((craftLarder && material.indent) || !craftLarder)));

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={mobile}
        maxWidth="xl"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{packName}</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className="body-container pack-container">
          <div className="pack-header">
            <Typography variant="h6">{sellZone === CARGO ? 'Purchasing Cargo' : 'Crafting Requirements'}</Typography>
            <div className="pack-quantity">
              <Typography variant="caption" color="primary">Quantity:</Typography>
              <NumberField
                id="pack-qty"
                hiddenLabel
                margin="none"
                min={1}
                max={1000}
                value={quantity}
                onChange={setQuantity(originZone, packType)}
              />
            </div>
            <Tooltip title={
              <>
                <Typography variant="body2">Calculate Demand Degradation</Typography>
                <Typography variant="caption">For every 4 packs, the demand will be reduced by 1%.</Typography>
              </>
            }>
              <Checkbox
                checked={degradeDemand}
                onChange={setDegradation}
                color="primary"
              />
            </Tooltip>
          </div>
          {sellZone !== CARGO &&
          <Table size="small" className="material-table">
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
                <TableRow key={`material-${material.item}`}>
                  <TableCell>
                    {material.indent &&
                    <span className="material-indent" />}
                    <ItemLink id={material.item} />
                  </TableCell>
                  <TableCell align="right">
                    {showItemCost(material)
                      ? <ItemPrice itemId={material.item} unitSize={unitSize} />
                      : '--'}
                  </TableCell>
                  {isAgedPack &&
                  <TableCell>
                    {!material.indent &&
                    <Checkbox
                      checked={craftLarder}
                      onChange={setCraftLarder}
                      color="primary"
                    />}
                  </TableCell>}
                  <TableCell align="right">
                    {quantity > 1
                      ? <Tooltip title={`${material.quantity} per pack`}>
                        <span>{material.quantity * quantity}</span>
                      </Tooltip>
                      : material.quantity
                    }
                  </TableCell>
                  <TableCell align="right">
                    {showItemCost(material)
                      ? <Currency
                        type={CURRENCY.COIN}
                        count={Math.round((prices[material.item] || 0) * 10000 * material.quantity * quantity)}
                      />
                      : '--'}
                  </TableCell>
                </TableRow>
              ))}
              {craftGold > 0 &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Craft Cost</TableCell>
                <TableCell align="right"><Currency type={CURRENCY.COIN} count={craftGold * quantity} /></TableCell>
              </TableRow>}
              {isAgedPack && craftLarder &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Craft Labor</TableCell>
                <TableCell align="right">
                  {calculateLabor(recipe.labor, recipe.vocation) * quantity}
                </TableCell>
              </TableRow>}
              {craftLabor > 0 &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>
                  {isAgedPack ? 'Harvest Labor' : 'Craft Labor'}
                </TableCell>
                <TableCell align="right">
                  {craftLabor * quantity}
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>}
          {sellZone !== CARGO &&
          <>
            <div className="pack-header">
              <Typography variant="h6" style={{ margin: '8px 0 4px' }}>
                Transporting to {sellZone}
              </Typography>
              <IconButton className="collapse-btn" onClick={() => this.setTransportExpand(!transportExpand)}>
                <ExpandMoreIcon
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
                    {TRANSPORTATION_FUEL.map((itemId, i) => (
                      <TableRow key={`transportation-${itemId}-${i}`}>
                        <TableCell>
                          <ItemLink id={itemId} />
                        </TableCell>
                        <TableCell align="right">
                          <ItemPrice itemId={itemId} />
                        </TableCell>
                        <TableCell align="right">
                          <NumberField
                            id={`transp-mat-qty-${itemId}`}
                            hiddenLabel
                            margin="none"
                            min={0}
                            max={100}
                            className="quantity"
                            value={pathOr(0, [originZone, sellZone, itemId])(transportationQty)}
                            onChange={setTransportationQuantity(originZone, sellZone, itemId)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Currency type={CURRENCY.COIN} count={transportCosts[itemId]} />
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
          </>}
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
                    {craftLabor}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>}
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
                      {freshnessLevels[profitLevel].modifier >= 1 && `+${Math.round((freshnessLevels[profitLevel].modifier - 1) * 100)}%`}
                      {freshnessLevels[profitLevel].modifier < 1 && `-${Math.round((1 - freshnessLevels[profitLevel].modifier) * 100)}%`}
                    </Typography>}
                >
                  {Object.keys(freshnessLevels).filter(k => k !== 'name').map(profitLevel => (
                    <MenuItem key={profitLevel} value={profitLevel}>
                      {profitLevel.substr(0, 1)}{profitLevel.toLowerCase().substr(1)} Profit:&nbsp;
                      {freshnessLevels[profitLevel].modifier >= 1 && `+${Math.round((freshnessLevels[profitLevel].modifier - 1) * 100)}%`}
                      {freshnessLevels[profitLevel].modifier < 1 && `-${Math.round((1 - freshnessLevels[profitLevel].modifier) * 100)}%`}
                      &nbsp;({freshnessLevels[profitLevel].time})
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
              {!pack.item
                ? <Tooltip title={<Currency type={CURRENCY.COIN} count={interest} />}>
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
                </Tooltip>
                : <FormControlLabel
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
                    {calculateLabor(sellLabor, COMMERCE) * quantity}
                  </TableCell>
                  <TableCell>Sell Value</TableCell>
                  <TableCell align="right">
                    {pack.item
                      ? <>
                        {packValue}&nbsp;
                        <Item id={pack.item} inline />
                      </>
                      : <Currency type={CURRENCY.COIN} count={packValue} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Labor</TableCell>
                  <TableCell align="right">
                    {totalLabor}
                  </TableCell>
                  <TableCell>Total Cost</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={totalGold || 0} />
                  </TableCell>
                </TableRow>
                <TableRow>
                </TableRow>
                {!pack.item &&
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell>Profit</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={profit} />
                  </TableCell>
                </TableRow>}
                {!pack.item &&
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

const mapStateToProps = ({ tradepacks, display: { mobile }, itemPrice, gameData: { recipes } }, props) => {
  const recipeId = getPackRecipe(props);
  return {
    ...tradepacks,
    mobile,
    prices: itemPrice,
    recipe: recipes[recipeId] || {},
  };
};

const mapDispatchToProps = {
  setCraftLarder,
  setDegradation,
  setFreshness,
  setInterest,
  setPercentage,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
  calculateLabor,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackViewer);
