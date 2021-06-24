import {
  AppBar,
  Checkbox,
  Collapse,
  DialogContent,
  Divider,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { openDialog } from 'actions/display';
import {
  updateFolioInventory,
  updateFolioMaterials,
  updateFolioQuantity,
} from 'actions/folio';
import {
  fetchRecipe,
  fetchRecipeByCategory,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import { calculateLabor } from 'actions/proficiencies';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import NumberField from 'components/NumberField';
import {
  DIALOG_MY_GAME,
  PROFICIENCIES,
} from 'constants/display';
import {
  CRAFT_GOLD_SALE,
  MAX_CRAFT_QTY,
  PATRON_AH_CUT,
  STANDARD_AH_CUT,
} from 'constants/folio';
import { CURRENCY } from 'constants/items';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { setTitle } from 'utils/string';
import Material from './Material';

class RecipeViewer extends Component {
  static propTypes = {
    recipeId: number,
    handleClose: func,
    onSizeChange: func,
    recipes: object.isRequired,
    fetchRecipeByCategory: func.isRequired,
    updateFolioInventory: func.isRequired,
    updateFolioMaterials: func.isRequired,
    updateFolioQuantity: func.isRequired,
    materials: object.isRequired,
    inventory: object.isRequired,
    items: object.isRequired,
    proficiencies: object.isRequired,
    itemPrice: object.isRequired,
    categories: object.isRequired,
    subCategories: object.isRequired,
    calculateLabor: func.isRequired,
    openDialog: func.isRequired,
    mobile: bool.isRequired,
    quantity: number.isRequired,
  };

  static defaultProps = {
    recipeId: null,
    handleClose: null,
  };

  state = {
    showBreakdown: true,
    auctionCut: 1,
  };

  constructor(props) {
    super(props);
    this.recipeRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.recipeId !== nextProps.recipeId) {
      fetchRecipe(nextProps.recipeId);
      // reset crafting breakdown
      this.setState({ materials: {}, quantity: 1, sale: false });
    }
    if (this.props.recipes[this.props.recipeId] !== nextProps.recipes[nextProps.recipeId]) {
      const recipe = nextProps.recipes[nextProps.recipeId];
      if (recipe && recipe.category) {
        nextProps.fetchRecipeByCategory(recipe.category, recipe.subCat1 || '', recipe.subCat2 || '');
      }
    }
  }

  componentDidUpdate() {
    const { onSizeChange } = this.props;
    const ref = this.recipeRef.current;

    if (onSizeChange) {
      setTimeout(() => {
        const { height } = ref.getBoundingClientRect();
        onSizeChange(height);
      }, 250);
    }
  }

  componentDidMount() {
    const { recipeId } = this.props;
    if (recipeId) {
      fetchRecipe(recipeId);
    }
  }

  goToRecipe = (recipeId) => {
    const { search, pathname } = document.location;
    const path = pathname.split('/');
    path[3] = recipeId;
    push(path.join('/') + search);
  };

  handleClickMaterial = (itemId) => {
    const { recipes } = this.props;
    if (itemId === null) return;

    const recipe = Object.values(recipes).find(recipe => recipe.item === itemId);
    if (recipe) {
      this.goToRecipe(recipe.id);
    }
  };

  handleUpdateMaterial = (itemId) => (mats) => {
    const { recipeId, updateFolioMaterials, materials } = this.props;
    updateFolioMaterials(recipeId, { ...materials, [itemId]: mats });
  };

  handleUpdateSale = (e, sale) => {
    const { recipeId, updateFolioMaterials, materials } = this.props;
    updateFolioMaterials(recipeId, { ...materials, sale });
  };

  handleQuantity = (quantity) => {
    const { recipeId, updateFolioQuantity } = this.props;
    quantity = Math.max(quantity, 1);
    quantity = Math.min(quantity, MAX_CRAFT_QTY);
    updateFolioQuantity(recipeId, quantity);
  };

  handleMaterialQuantity = (itemId) => (quantity) => {
    const { recipeId, updateFolioInventory, inventory } = this.props;
    quantity = Math.max(quantity, 0);
    updateFolioInventory(recipeId, { ...inventory, [itemId]: quantity });
  };

  toggleBreakdown = () => {
    const { showBreakdown } = this.state;
    this.setState({ showBreakdown: !showBreakdown });
  };

  setAuctionCut = (e, checked) => {
    const auctionCut = e.target.value;
    this.setState({ auctionCut: checked ? auctionCut : 1 });
  };

  // eslint-disable-next-line complexity
  render() {
    const { items, recipes, proficiencies, itemPrice, categories, subCategories } = this.props;
    const { handleClose, calculateLabor, openDialog } = this.props;
    const { mobile, recipeId } = this.props;
    const { materials, quantity, inventory } = this.props;

    const { showBreakdown, auctionCut } = this.state;

    const recipe = recipes[recipeId] || {};

    if (recipe.name) {
      setTitle(`${recipe.name} - Folio`);
    }

    const materialList = {};
    let craftGold = Math.round(recipe.gold * (materials.sale ? CRAFT_GOLD_SALE : 1)) * quantity;
    let craftLabor = calculateLabor(recipe.labor, recipe.vocation) * quantity;
    const addMaterial = (itemId, quantity) => {
      if (!materialList[itemId]) {
        materialList[itemId] = 0;
      }
      materialList[itemId] += quantity;
    };
    const calculateMatStep = ((material, materials) => {
      const { item: itemId, quantity } = material;
      const options = materials[itemId] || {};
      const value = pathOr('gold', ['value'])(options);
      if (value === 'gold') {
        addMaterial(itemId, quantity);
        craftLabor += options.labor || 0;
      } else {
        const recipe = Object.values(recipes).find(r => String(r.id) === value);
        if (recipe) {
          recipe.materials.forEach((mat) => calculateMatStep({
            ...mat,
            quantity: Math.ceil(quantity / recipe.quantity) * mat.quantity,
          }, options));
          craftGold += Math.round(recipe.gold * (options.sale ? CRAFT_GOLD_SALE : 1)) *
            Math.ceil(quantity / recipe.quantity);
          craftLabor += calculateLabor(recipe.labor, recipe.vocation) * Math.ceil(quantity / recipe.quantity);
        }
      }
    });

    if (recipe.materials) {
      recipe.materials.forEach((mat) => {
        calculateMatStep({ ...mat, quantity: mat.quantity * quantity }, materials);
      });
    }

    let rankCategory = {};
    if (recipe.rank) {
      if ((recipe.subCat1 || recipe.subCat2) && objectHasProperties(subCategories)) {
        rankCategory = subCategories[recipe.subCat2 || recipe.subCat1];

        if (recipe.subCat2) {
          rankCategory.parent = subCategories[recipe.subCat1];
        } else {
          rankCategory.parent = categories[recipe.category];
        }
      } else {
        rankCategory = objectHasProperties(categories) ? categories[recipe.category] : {};
      }
    }
    let rankCategoryName = rankCategory.name || '';
    let rankRecipes = recipe.rank
      ? Object.values(recipes).filter(r => r.category === recipe.category && r.subCat1 === recipe.subCat1 && r.subCat2 === recipe.subCat2 && r.rank > 0).sort(sortBy('rank'))
      : [];
    if (rankRecipes.filter(r => r.rank === 1).length > 1) {
      rankRecipes = rankRecipes.filter(r => r.workbench === recipe.workbench);
    }
    if (rankCategoryName === 'Single Production') {
      rankCategory = rankCategory.parent;
      rankCategoryName = `${rankCategory.name} Production`;
    } else if (rankCategoryName === 'Mass Production') {
      rankCategory = rankCategory.parent;
      rankCategoryName = `${rankCategory.name} Mass Production`;
    }

    const totalGold = (craftGold || 0) + (objectHasProperties(materialList)
      ? Object.entries(materialList)
      .map(([itemId, quantity]) =>
        Math.max(quantity - (inventory[itemId] || 0), 0) * (itemPrice[itemId] || 0) * 10000)
      .reduce((a, b) => a + b)
      : 0);
    const salePrice = (quantity * recipe.quantity * (itemPrice[recipe.item] || 0) * 10000) * Number.parseFloat(auctionCut);

    return (
      <div ref={this.recipeRef}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">
              {recipe.name}
            </Typography>
            <Tooltip title="Configure Proficiency">
              <IconButton onClick={() => openDialog(DIALOG_MY_GAME, PROFICIENCIES)} color="inherit">
                <ListAltIcon />
              </IconButton>
            </Tooltip>
            {handleClose &&
            <Tooltip title="Close">
              <IconButton onClick={handleClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Tooltip>
            }
          </Toolbar>
        </AppBar>
        <DialogContent className="body-container">
          <div className="craft-container">
            <div className="craft-rank craft-section">
              <Typography className="craft-header">Crafting Rank</Typography>
              <Typography variant="subtitle2">{recipe.rank ? `${rankCategoryName} Rank ${recipe.rank}`
                : 'This item has no rank.'}</Typography>
              <RadioGroup row>
                {rankRecipes.map(r => (
                  <Tooltip title={`Rank ${r.rank}: ${r.name}`} key={`rank-${r.rank}-${r.id}`}>
                    <Radio
                      checked={r.rank === recipe.rank}
                      color="secondary"
                      onChange={(e, checked) => checked && this.goToRecipe(r.id)}
                    />
                  </Tooltip>
                ))}
                {rankRecipes.length === 0 &&
                <>
                  <Radio disabled />
                  <Radio disabled />
                  <Radio disabled />
                  <Radio disabled />
                  <Radio disabled />
                </>}
              </RadioGroup>
            </div>
            <div className="craft-result craft-section">
              <Typography className="craft-header">Craftable Item</Typography>
              <div className="item-block">
                <div className="craft-item">
                  {recipe.item && <Item id={recipe.item} count={recipe.quantity} grade={recipe.grade} />}
                </div>
                <Typography>
                  {recipe.quantity > 1 ? `[${recipe.quantity}]` : ''} {pathOr('', [recipe.item, 'name'])(items)}
                </Typography>
              </div>
            </div>
            <div className="craft-requirements craft-section">
              <Typography className="craft-header">Requirements</Typography>
              <Typography
                variant="subtitle2">{recipe.workbench && `Workbench: ${recipe.workbench}`}&nbsp;</Typography>
              <Typography
                variant="subtitle2"
                className={cn({ 'craft-locked': (proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency })}
              >
                {recipe.requiredProficiency > 0 && `Proficiency: ${recipe.vocation}`}&nbsp;
              </Typography>
              <Typography
                variant="subtitle2"
                className={cn('craft-req-prof', { 'craft-locked': (proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency })}
              >
                {recipe.requiredProficiency === 230000
                  ? <>
                    <div
                      className={cn('famed-icon', { locked: (proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency })}
                    />
                    {(proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency &&
                    <span>Max Proficiency Required</span>}
                  </>
                  : <>
                    {recipe.requiredProficiency > 0 && recipe.requiredProficiency}
                  </>}
                &nbsp;
              </Typography>
            </div>
            <div className="craft-resource craft-section">
              <Typography className="craft-header">Using Resource</Typography>
              <Typography
                variant="subtitle2"
                className={cn({ 'text-green': calculateLabor(recipe.labor, recipe.vocation) < recipe.labor })}
              >
                {recipe.name && `Labor Cost: ${calculateLabor(recipe.labor, recipe.vocation)}`}&nbsp;
              </Typography>
              <div className="craft-materials">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    className="craft-item sm"
                    key={pathOr(`material-${i}`, ['materials', i, 'item'])(recipe)}
                    onClick={() => this.handleClickMaterial(pathOr(null, ['materials', i, 'item'])(recipe))}
                    style={{ cursor: recipe.materials && recipe.materials[i] ? 'pointer' : 'default' }}
                  >
                    {recipe.materials && recipe.materials[i] &&
                    <Item
                      id={recipe.materials[i].item}
                      grade={recipe.materials[i].grade}
                      count={recipe.materials[i].quantity}
                    />}
                  </div>
                ))}
              </div>
            </div>
            <div className="craft-cost">
              {!materials.sale &&
              <Typography variant="subtitle2" className="craft-header">Cost</Typography>}
              {materials.sale &&
              <div className="sale">
                <div className="icon" />
                <Typography>10%</Typography>
              </div>}
              <span className="craft-gold">
                <Currency
                  type={CURRENCY.COIN}
                  count={(recipe.gold || 0) * (materials.sale ? CRAFT_GOLD_SALE : 1)}
                  inline />
              </span>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <Divider />
          <div className="material-breakdown">
            <div className="material-header">
              <Typography variant="h6">{!mobile && 'Crafting '}Breakdown</Typography>
              <div>
                <InputLabel htmlFor="craft-qty">Quantity:</InputLabel>
                <NumberField
                  id="craft-qty"
                  value={quantity}
                  onChange={this.handleQuantity}
                  min={1}
                  max={MAX_CRAFT_QTY}
                />
                <Tooltip
                  title={
                    <div>
                      <Typography variant="subtitle1">Sale:</Typography>
                      <div>Toggle the 10% gold cost bonus from workstation ownership.</div>
                    </div>
                  }
                >
                  <Checkbox
                    checked={materials.sale || false}
                    onChange={this.handleUpdateSale}
                    value="sale"
                    color="primary"
                  />
                </Tooltip>
                <IconButton
                  onClick={this.toggleBreakdown}
                >
                  {showBreakdown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
            </div>
            <Collapse in={showBreakdown} unmountOnExit>
              {recipe.materials && recipe.materials.map(mat => (
                <Material
                  key={`mat-${mat.item}`}
                  recipeId={recipe.id}
                  {...mat}
                  quantity={mat.quantity * quantity}
                  materials={materials[mat.item]}
                  recipes={recipes}
                  onUpdate={this.handleUpdateMaterial(mat.item)}
                  depth={1}
                />
              ))}
            </Collapse>
          </div>
          <AdContainer type="horizontal" data-id={recipeId} />
          <Divider />
          <div className="material-breakdown">
            <div className="material-header">
              <Typography variant="h6">Crafting Totals</Typography>
            </div>
            <Table size={mobile ? 'medium' : 'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Have</TableCell>
                  <TableCell align="right">Need</TableCell>
                  <TableCell align="right">Gold per unit</TableCell>
                  <TableCell align="right" nowrap="true">Total Gold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(materialList).map(([itemId, quantity]) => (
                  <TableRow
                    key={`mat-total-${itemId}`}
                    className={cn({ 'row-complete': (inventory[itemId] >= quantity) })}
                  >
                    <TableCell>
                      <ItemLink id={Number(itemId)} noLink name={mobile ? '' : null} />
                    </TableCell>
                    <TableCell align="right">
                      {quantity}
                    </TableCell>
                    <TableCell align="right">
                      <NumberField
                        value={inventory[itemId] || 0}
                        onChange={this.handleMaterialQuantity(itemId)}
                        min={0}
                        max={quantity}
                        inputStyle={{ width: 60 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {Math.max(quantity - (inventory[itemId] || 0), 0)}
                    </TableCell>
                    <TableCell align="right">
                      <ItemPrice itemId={Number(itemId)} unitSize={1} />
                    </TableCell>
                    <TableCell align="right" nowrap="true">
                      <Currency
                        type={CURRENCY.COIN}
                        count={Math.max(quantity - (inventory[itemId] || 0), 0) * (itemPrice[itemId] || 0) * 10000}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell align="right">Craft Gold:</TableCell>
                  <TableCell align="right" nowrap="true"><Currency type={CURRENCY.COIN} count={craftGold} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell align="right">Total Gold:</TableCell>
                  <TableCell align="right" nowrap="true">
                    <Currency type={CURRENCY.COIN} count={totalGold} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell align="right">Total Labor:</TableCell>
                  <TableCell align="right">{craftLabor || 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {recipe.item && items[recipe.item] &&
          <>
            <Divider />
            <div className="material-breakdown">
              <div className="material-header">
                <Typography variant="h6" style={{ display: 'inline-block' }}>Crafting Profits</Typography>
                {items[recipe.item].bindsOnPickup &&
                <Typography
                  variant="body2"
                  style={{ placeSelf: 'start', flex: 1, marginLeft: 6 }}
                >
                  (Binds on Pickup)
                </Typography>}
              </div>
              <Table size={mobile ? 'medium' : 'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Gold per unit</TableCell>
                    <TableCell>AH Cut</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ItemPrice itemId={recipe.item} unitSize={1} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={<Typography variant="subtitle1">10% Auction Cut</Typography>}>
                        <Checkbox
                          checked={auctionCut === String(STANDARD_AH_CUT)}
                          onChange={this.setAuctionCut}
                          value={STANDARD_AH_CUT}
                          color="primary"
                        />
                      </Tooltip>
                      <Tooltip title={<Typography variant="subtitle1">5% Auction Cut</Typography>}>
                        <Checkbox
                          checked={auctionCut === String(PATRON_AH_CUT)}
                          onChange={this.setAuctionCut}
                          value={PATRON_AH_CUT}
                          color="primary"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">Sale Price</TableCell>
                    <TableCell align="right">
                      <Currency
                        type={CURRENCY.COIN}
                        count={salePrice}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">Profit:</TableCell>
                    <TableCell align="right">
                      <Currency type={CURRENCY.COIN} count={(salePrice - totalGold)} />
                    </TableCell>
                  </TableRow>
                  {craftLabor > 0 &&
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">Silver per Labor:</TableCell>
                    <TableCell align="right">
                      <Currency type={CURRENCY.COIN} count={(salePrice - totalGold) / craftLabor} />
                    </TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
            </div>
          </>}
        </DialogContent>
      </div>
    );
  }
}

const mapStateToProps = ({
                           gameData: { items, recipes, categories, subCategories },
                           proficiencies,
                           itemPrice,
                           display: { mobile },
                           folio,
                         }, { recipeId }) => ({
  items,
  proficiencies,
  recipes,
  categories,
  subCategories,
  itemPrice,
  mobile,
  ...({ materials: {}, quantity: 1, inventory: {}, ...folio[recipeId] }),
});

const mapDispatchToProps = {
  calculateLabor,
  openDialog,
  fetchRecipeByCategory,
  updateFolioMaterials,
  updateFolioInventory,
  updateFolioQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeViewer);
