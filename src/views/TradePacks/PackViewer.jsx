import {
  AppBar,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
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
import { getItemPrice } from 'actions/itemPrice';
import { push } from 'actions/navigate';
import { calculateLabor } from 'actions/proficiencies';
import {
  setAHCut,
  setCraftLarder,
  setDegradation,
  setInterest,
  setPercentage,
  setProfitLevel,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
} from 'actions/tradepacks';
import AdContainer from 'components/AdContainer';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import NumberField from 'components/NumberField';
import OptionalTooltip from 'components/OptionalTooltip';
import SelectField from 'components/SelectField';
import {
  CURRENCY,
  ITEM,
} from 'constants/items';
import { ZONE } from 'constants/map';
import {
  COMMERCE,
  HUSBANDRY,
} from 'constants/proficiencies';
import {
  BUY_CARGO_LABOR,
  CONTINENT_PACKS,
  DISGUISED_PACK_MATERIALS,
  FRESHNESS,
  LARDER_HARVEST_LABOR,
  OUTLET_ZONE,
  PACK_PERCENT_MAX,
  PACK_PERCENT_MIN,
  PACK_TABLE,
  PACK_TYPE,
  SELL_CARGO_LABOR,
  SELL_LABOR,
} from 'constants/tradepacks';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { percentModifier } from 'utils/number';
import {
  setTitle,
  slug,
} from 'utils/string';
import {
  getZonePrefix,
  mapCargoToContinent,
} from 'utils/tradepacks';

class PackViewer extends Component {
  static propTypes = {
    onClose: func.isRequired,
    pack: object,
    sellZoneId: number,
    recipe: object,
    craftLarder: bool,
    degradeDemand: bool,
    freshness: object,
    packType: object,
    showInterest: bool,
    percentage: number,
    quantity: number,
    profitLevelName: string,
    supplyLevelName: string,
    mobile: bool,
    transportationQty: object,
    war: bool,
    setCraftLarder: func.isRequired,
    setDegradation: func.isRequired,
    setProfitLevel: func.isRequired,
    setInterest: func.isRequired,
    setPercentage: func.isRequired,
    setQuantity: func.isRequired,
    setSupply: func.isRequired,
    setTransportationQuantity: func.isRequired,
    setWar: func.isRequired,
    calculateLabor: func.isRequired,
    ahCut: object,
    setAHCut: func.isRequired,
    region: string,
    getItemPrice: func.isRequired,
    continents: object,
    zoneName: string,
    zones: object,
  };

  static defaultProps = {
    originZone: null,
    packType: null,
    sellZoneId: null,
    region: 'NA',
  };

  state = {
    transportExpand: false,
    unitSize: 1,
    manualLabor: 0,
  };

  // eslint-disable-next-line class-methods-use-this
  UNSAFE_componentWillReceiveProps(nextProps) {
    const packRecipe = pathOr(null, ['pack', 'recipeId'])(nextProps);
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

  setManualLabor = (manualLabor) => {
    this.setState({ manualLabor: manualLabor || 0 });
  };

  // eslint-disable-next-line complexity
  render() {
    const { onClose, pack, sellZoneId, recipe, region, freshness, packType } = this.props;
    const { transportExpand, unitSize, manualLabor } = this.state;
    const {
      craftLarder,
      degradeDemand,
      profitLevelName,
      showInterest,
      percentage,
      quantity,
      supplyLevelName,
      mobile,
      transportationQty,
      war,
      ahCut,
      continents,
      zoneName,
      zones,
    } = this.props;
    const {
      setCraftLarder,
      setDegradation,
      setProfitLevel,
      setInterest,
      setPercentage,
      setQuantity,
      setSupply,
      setTransportationQuantity,
      setWar,
      calculateLabor,
      setAHCut,
      getItemPrice,
    } = this.props;

    // do nothing if value is missing
    if (!pack) return null;

    // spread the costs into the pack details first, to allow individual packs to overwrite costs
    const profitLevels = freshness.profitLevels.filter(pL => pL.aged === packType.aged);
    const profitLevel = profitLevels.find(l => l.name === profitLevelName) || profitLevels[0];
    const supplyLevel = pathOr([], ['supplyLevels'])(packType).find(l => l.name === supplyLevelName);

    const isAgedPack = packType.aged;
    const isCargo = packType.id === PACK_TYPE.CARGO;
    const isDisguised = packType.id === PACK_TYPE.DISGUISED;
    const sellLabor = isCargo ? SELL_CARGO_LABOR : SELL_LABOR;

    const { originZoneId } = pack;

    // create outlet lists
    let outletZones;
    if (isCargo) {
      outletZones = CONTINENT_PACKS[PACK_TABLE.CARGO];
    } else if (isDisguised) {
      outletZones = OUTLET_ZONE[PACK_TABLE.AURORIA];
    } else {
      outletZones = OUTLET_ZONE[zones[sellZoneId].continentId];
    }
    outletZones = outletZones
    .filter(z => pack.values.map(v => v.sellZoneId).includes(z))
    .reduce((obj, zoneId) => {
      obj[zoneId] = zones[zoneId].name;
      return obj;
    }, {});

    // create transport fuel items
    let transportItems;
    if (isCargo) {
      transportItems = [
        ITEM.ECO_FRIENDLY_FUEL,
        ITEM.CAPTAINS_PROTECTION,
      ];
    } else {
      transportItems = [
        ITEM.CARROT,
        ITEM.ECO_FRIENDLY_FUEL,
        ITEM.AXLE_GREASE,
      ];
    }

    // construct a pack name, if no special name is given
    let packName = pack.name;
    if (!packName) {
      switch (pack.packTypeId) {
        case PACK_TYPE.CARGO:
          packName = `${continents[mapCargoToContinent(originZoneId)].name} Cargo`;
          break;
        case PACK_TYPE.BLUE_SALT:
          packName = `${getZonePrefix(zoneName, originZoneId)} Pack`;
          break;
        case PACK_TYPE.ANTIQUITIES:
          packName = `${getZonePrefix(zoneName, originZoneId)} ${packType.name}`;
          break;
        default:
          packName = `${getZonePrefix(zoneName, originZoneId)} ${freshness.name}`;
          if (isAgedPack) {
            let { name } = packType;
            if (name.indexOf('Rich') >= 0) {
              name = name.split(' ')[1];
              packName += ` Rich`;
            }
            packName += ` Aged ${name}`;
          } else {
            if (packType.id !== PACK_TYPE.NORMAL) {
              packName += ` ${packType.name}`;
            }
            packName += ' Specialty';
          }
      }
    }

    setTitle(packName);

    let interest;
    let {
      value: packValue,
      itemId: packItem,
    } = pack.values.find(v => v.sellZoneId === sellZoneId && v.region === region) || {};
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
      }
      // modify the freshness
      if (packType.freshness) {
        packValue *= profitLevel.modifier;
      }
      // modify war bonus
      if (war && packType.warBonus) {
        packValue *= 1.15;
      }
      interest = Math.round(packValue * .02 * 10000);
      if (showInterest) {
        packValue *= 1.02;
      }
      if (packItem) {
        packValue = Math.round(packValue);
      } else {
        packValue = Math.round(packValue * 10000);
      }
      if (!degradeDemand) {
        packValue *= quantity;
      }
      packValue = Math.round(packValue * demand);
    } else {
      packValue = 0;
    }

    const ahCutValue = pathOr(0, [packItem])(ahCut);

    // craft labor
    let totalLabor = calculateLabor(sellLabor, recipe.vocation || COMMERCE);

    // define initial
    let materials = packType.id === PACK_TYPE.DISGUISED ? DISGUISED_PACK_MATERIALS : recipe.materials || [];
    let craftGold = 0;
    let craftLabor = isAgedPack
      ? calculateLabor(LARDER_HARVEST_LABOR, HUSBANDRY)
      : calculateLabor(recipe.labor, recipe.vocation);
    // cargo pack, modify
    if (isCargo) {
      craftLabor = calculateLabor(BUY_CARGO_LABOR, COMMERCE);
    }
    let totalGold = 0;

    if (isAgedPack && recipe.item) {
      materials = [{ item: recipe.item, quantity: 1 }];
    } else {
      craftGold = recipe.gold || 0;
    }
    if (isAgedPack && craftLarder) {
      (recipe.materials || []).forEach((mat) => materials.push({ ...mat, indent: true }));
      craftGold += recipe.gold || 0;
      totalLabor += calculateLabor(recipe.labor, recipe.vocation);
    }

    totalGold += craftGold;
    totalLabor += craftLabor + manualLabor;

    materials.forEach(mat => {
      if (!mat.indent && craftLarder && isAgedPack) return;
      totalGold += getItemPrice(mat.item) * 10000 * mat.quantity;
    });
    if (isCargo) {
      totalGold = supplyLevel.value;
    }
    totalGold = Math.round(totalGold);

    // increase total labor and gold cost by quantity
    totalLabor *= quantity;
    totalGold *= quantity;

    const transportCosts = {};
    transportItems.forEach((itemId) => {
      transportCosts[itemId] = Math.round(getItemPrice(itemId) * (transportationQty[itemId] || 0) * 10000);
    });

    const transportTotal = Object.values(transportCosts).reduce((a, b) => a + b);
    totalGold += transportTotal;

    const itemPrice = getItemPrice(packItem) * 10000 * (1 - (ahCutValue / 100));
    const profit = (packItem ? itemPrice * packValue : packValue) - totalGold;

    const showItemCost = (material) => (!isAgedPack || (isAgedPack && ((craftLarder && material.indent) || !craftLarder)));

    return (
      <Dialog
        open={true}
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
            <Typography variant="h6">{isCargo ? 'Purchasing Cargo' : 'Crafting Requirements'}</Typography>
            <div className="pack-quantity">
              <Typography variant="caption" color="primary">Quantity:</Typography>
              <NumberField
                id="pack-qty"
                hiddenLabel
                margin="none"
                min={1}
                max={1000}
                value={quantity}
                onChange={setQuantity(pack.id)}
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
          {!isCargo &&
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
                        count={Math.round(getItemPrice(material.item) * 10000 * material.quantity * quantity)}
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
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Manual Labor</TableCell>
                <TableCell align="right">
                  <NumberField onChange={this.setManualLabor} value={manualLabor} min={0} />
                </TableCell>
              </TableRow>
              {isAgedPack && craftLarder &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>Craft Labor</TableCell>
                <TableCell align="right">
                  {calculateLabor(recipe.labor, recipe.vocation) * quantity}
                </TableCell>
              </TableRow>}
              {(craftLabor > 0 || manualLabor > 0) &&
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell colSpan={isAgedPack ? 2 : 1}>
                  {isAgedPack ? 'Harvest Labor' : 'Craft Labor'}
                </TableCell>
                <TableCell align="right">
                  {(craftLabor + manualLabor) * quantity}
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>}
          {isCargo &&
          <div className="sell-config">
            <SelectField
              id="select-profit"
              label="Supply"
              value={supplyLevelName}
              onChange={setSupply(pack.id)}
              renderValue={() => <Typography>{supplyLevel.name} Supply: {supplyLevel.percent}%</Typography>}
              options={packType.supplyLevels.reduce((obj, sL) => {
                obj[sL.name] = (
                  <>{sL.name} Supply: {sL.percent}%&nbsp;<Currency type={CURRENCY.COIN} count={sL.value} /></>
                );
                return obj;
              }, {})}
            />
            <Table size="small" style={{ width: 185 }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Pack Cost
                  </TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={supplyLevel.value} />
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
          <div className="pack-header">
            <Typography variant="h6" style={{ margin: '8px 0 4px' }}>
              Transporting to {pathOr('', [sellZoneId, 'name'])(zones)}
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
                  {transportItems.map((itemId, i) => (
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
                          value={transportationQty[itemId] || 0}
                          onChange={setTransportationQuantity(pack.originZoneId, sellZoneId, itemId)}
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
          <Typography variant="h6" style={{ margin: '8px 0 4px' }}>
            Selling at&nbsp;
            <SelectField
              id="selling-at"
              value={sellZoneId}
              onChange={(e, zoneId) => push(`?to=${slug(zones[zoneId].name)}`)}
              renderValue={() => <Typography>{zones[sellZoneId].name}</Typography>}
              options={outletZones}
            />
          </Typography>
          <div className="sell-config">
            <div>
              <NumberField
                label="Demand"
                onChange={setPercentage(pack.id, sellZoneId)}
                value={percentage}
                defaultValue={PACK_PERCENT_MAX}
                min={PACK_PERCENT_MIN}
                max={PACK_PERCENT_MAX}
                endAdornment="%"
                style={{ width: 72 }}
              />
              {packType.freshness &&
              <SelectField
                id="select-freshness"
                label={`[${freshness.name}] Freshness`}
                value={profitLevelName}
                onChange={setProfitLevel(pack.id, sellZoneId)}
                renderValue={() =>
                  <Typography>{profitLevel.name} Profit: {percentModifier(profitLevel.modifier)}</Typography>}
                options={profitLevels.reduce((obj, pL) => {
                  obj[pL.name] = (<>{pL.name} Profit: {percentModifier(pL.modifier)} ({pL.time})</>);
                  return obj;
                }, {})}
              />}
              {(sellZoneId === ZONE.YNYSTERE || sellZoneId === ZONE.CINDERSTONE_MOOR) &&
              <FormControlLabel
                control={
                  <Checkbox
                    checked={war}
                    onChange={setWar(sellZoneId)}
                    color="primary"
                    disabled={!packType.warBonus}
                  />
                }
                label="Zone in War (+15%)"
              />}
              <OptionalTooltip title={!packItem && <Currency type={CURRENCY.COIN} count={interest} />}>
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
              </OptionalTooltip>
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
                    {packItem
                      ? <>
                        {packValue}&nbsp;
                        <Item id={packItem} inline />
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
                {packItem &&
                <TableRow>
                  <TableCell>
                    Auction Cut
                  </TableCell>
                  <TableCell align="right">
                    <SelectField
                      id="select-cut"
                      value={ahCutValue}
                      onChange={setAHCut(packItem)}
                      renderValue={() => <Typography>{ahCutValue ? `${ahCutValue}%` : 'None'}</Typography>}
                      options={{ 0: 'None', 5: '5%', 10: '10%' }}
                    />
                  </TableCell>
                  <TableCell>Sale Value</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={itemPrice * packValue} />
                  </TableCell>
                </TableRow>}
                <TableRow>
                  {packItem
                    ? <>
                      <TableCell rowSpan={2}>
                        <Item id={packItem} inline />
                      </TableCell>
                      <TableCell rowSpan={2} align="right">
                        <ItemPrice itemId={packItem} />
                      </TableCell>
                    </>
                    : <><TableCell rowSpan={2} /><TableCell rowSpan={2} /></>}
                  <TableCell>Profit</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={profit} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><span className="currency silver" style={{ display: 'inline' }} />&nbsp;per
                    Labor</TableCell>
                  <TableCell align="right">
                    <Currency type={CURRENCY.COIN} count={Math.round((profit) / totalLabor)} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <AdContainer section={false} type="horizontal" />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({
                           tradepacks,
                           display: { mobile },
                           gameData: {
                             recipes,
                             tradePacks: { types, freshness: freshnessData = {} },
                             continents,
                             zones,
                           },
                         }, { pack, sellZoneId }) => {
  const tradePack = pack || {};
  let freshness;
  if (tradePack.packTypeId === PACK_TYPE.CARGO) {
    freshness = freshnessData[FRESHNESS.CARGO];
  } else if (tradePack.packTypeId === PACK_TYPE.DISGUISED) {
    freshness = freshnessData[FRESHNESS.DISGUISED];
  } else {
    freshness = Object.values(freshnessData).find(f => f.zoneIds.includes(tradePack.originZoneId));
  }
  return {
    region: tradepacks.region,
    craftLarder: tradepacks.craftLarder,
    degradeDemand: tradepacks.degradeDemand,
    showInterest: tradepacks.showInterest,
    ahCut: tradepacks.ahCut,
    packType: pathOr({}, [tradePack.packTypeId])(types),
    freshness,
    profitLevelName: pathOr('High', ['profitLevel', tradePack.id, sellZoneId])(tradepacks),
    percentage: pathOr(tradepacks.percentage, ['percentages', tradePack.id, sellZoneId])(tradepacks),
    quantity: pathOr(1, ['quantities', tradePack.id])(tradepacks),
    supplyLevelName: pathOr('Limited', ['supply', tradePack.id])(tradepacks),
    transportationQty: pathOr({}, ['transportationQty', tradePack.originZoneId, sellZoneId])(tradepacks),
    war: pathOr(false, ['war', sellZoneId])(tradepacks),
    mobile,
    recipe: recipes[tradePack.recipeId] || {},
    continents,
    zoneName: pathOr('', [tradePack.originZoneId, 'name'])(zones),
    zones,
  };
};

const mapDispatchToProps = {
  setCraftLarder,
  setDegradation,
  setProfitLevel,
  setInterest,
  setPercentage,
  setQuantity,
  setSupply,
  setTransportationQuantity,
  setWar,
  calculateLabor,
  setAHCut,
  getItemPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackViewer);
