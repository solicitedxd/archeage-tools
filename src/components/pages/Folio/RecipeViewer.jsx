import {
  AppBar,
  Checkbox,
  Collapse,
  DialogContent,
  Divider,
  IconButton,
  Input,
  InputLabel,
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
  fetchRecipe,
  fetchRecipeByProduct,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import { calculateLabor } from 'actions/proficiencies';
import cn from 'classnames';
import Currency from 'components/Currency';
import Item from 'components/Item';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import Material from 'components/pages/Folio/Material';
import { DIALOG_PROFICIENCY } from 'constants/display';
import { CURRENCY } from 'constants/items';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  func,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { arrayToMap } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { setTitle } from 'utils/string';

class RecipeViewer extends Component {
  static propTypes = {
    recipeId: number,
    handleClose: func,
    onSizeChange: func,
  };

  static defaultProps = {
    recipeId: null,
    handleClose: null,
  };

  state = {
    materials: {},
    quantity: 1,
    showBreakdown: true,
  };

  loadedItems = [];

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

  handleClickMaterial = (itemId) => {
    const { recipes } = this.state;
    if (itemId === null) return;

    const recipe = Object.values(recipes).find(recipe => recipe.item === itemId);
    if (recipe) {
      const { search, pathname } = document.location;
      const path = pathname.split('/');
      path[3] = recipe.id;
      push(path.join('/') + search);
    }
  };

  loadRecipes = (itemId) => {
    if (this.loadedItems.includes(itemId)) return;
    this.loadedItems.push(itemId);

    fetchRecipeByProduct(itemId)
    .then(data => {
      const { recipes } = this.state;
      this.setState({ recipes: { ...recipes, ...arrayToMap(data) } }, () => {
        Object.values(data).forEach(recipe => recipe.materials.forEach(mat => this.loadRecipes(mat.item)));
      });
    })
    .catch(() => {
    });
  };

  handleUpdateMaterial = (itemId) => (materials) => {
    this.setState({ materials: { ...this.state.materials, [itemId]: materials } });
  };

  handleUpdateSale = (e, sale) => {
    this.setState({ materials: { ...this.state.materials, sale } });
  };

  handleQuantity = (e) => {
    let quantity = e.target.value;
    quantity = Math.max(quantity, 1);
    quantity = Math.min(quantity, 999);
    this.setState({ quantity });
  };

  toggleBreakdown = () => {
    const { showBreakdown } = this.state;
    this.setState({ showBreakdown: !showBreakdown });
  };

  render() {
    const { items, recipes, proficiencies, itemPrice } = this.props;
    const { handleClose, calculateLabor, openDialog } = this.props;
    const { mobile, recipeId } = this.props;

    const { materials, quantity, showBreakdown } = this.state;

    const recipe = recipes[recipeId] || {};

    recipe.name && setTitle(`${recipe.name} - Folio`);

    const materialList = {};
    let craftGold = (recipe.gold * (materials.sale ? 0.9 : 1)) * quantity;
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
      } else {
        const recipe = Object.values(recipes).find(r => String(r.id) === value);
        if (recipe) {
          recipe.materials.forEach((mat) => calculateMatStep({
            ...mat,
            quantity: Math.ceil(quantity / recipe.quantity) * mat.quantity,
          }, options));
          craftGold += recipe.gold * (options.sale ? 0.9 : 1) * Math.ceil(quantity / recipe.quantity);
          craftLabor += calculateLabor(recipe.labor, recipe.vocation) * Math.ceil(quantity / recipe.quantity);
        }
      }
    });

    recipe.materials && recipe.materials.forEach((mat) => {
      calculateMatStep({ ...mat, quantity: mat.quantity * quantity }, materials);
    });

    return (
      <div ref={this.recipeRef}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">
              {recipe.name}
            </Typography>
            <Tooltip title="Configure Proficiency">
              <IconButton onClick={() => openDialog(DIALOG_PROFICIENCY)} color="inherit">
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
            <div className="craft-result craft-section">
              <div className="craft-item">
                {recipe.item && <Item id={recipe.item} count={recipe.quantity} grade={recipe.grade} />}
              </div>
              <Typography>
                {recipe.quantity > 1 ? `[${recipe.quantity}]` : ''} {pathOr('', [recipe.item, 'name'])(items)}
              </Typography>
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
                {recipe.requiredProficiency === 230000 ?
                  <>
                    <div
                      className={cn('famed-icon', { locked: (proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency })}
                    />
                    {(proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency &&
                    <span>Max Proficiency Required</span>}
                  </> :
                  <>
                    {recipe.requiredProficiency > 0 && recipe.requiredProficiency}
                  </>}
                &nbsp;
              </Typography>
            </div>
            <div className="craft-resource craft-section">
              <Typography className="craft-header">Using Resource</Typography>
              <Typography variant="subtitle2">
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
              <span className="craft-gold"><Currency type={CURRENCY.COIN} count={recipe.gold || 0} inline /></span>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <Divider />
          <div className="material-breakdown">
            <div className="material-header">
              <Typography variant="h6">{!mobile && 'Crafting '}Breakdown</Typography>
              <div>
                <InputLabel htmlFor="craft-qty">Quantity:</InputLabel>
                <Input
                  id="craft-qty"
                  value={quantity}
                  onChange={this.handleQuantity}
                  type="number"
                  min={1}
                  max={999}
                  inputProps={{
                    style: { textAlign: 'right' },
                  }}
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
                  <TableCell align="right">Gold per unit</TableCell>
                  <TableCell align="right">Total Gold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(materialList).map(([itemId, quantity]) => (
                  <TableRow key={`mat-total-${itemId}`}>
                    <TableCell>
                      <ItemLink id={Number(itemId)} noLink name={mobile ? '' : null} />
                    </TableCell>
                    <TableCell align="right">
                      {quantity}
                    </TableCell>
                    <TableCell align="right">
                      <ItemPrice itemId={Number(itemId)} unitSize={1} />
                    </TableCell>
                    <TableCell align="right">
                      <Currency type={CURRENCY.COIN} count={quantity * (itemPrice[itemId] || 0) * 10000} />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell align="right">Craft Gold:</TableCell>
                  <TableCell align="right"><Currency type={CURRENCY.COIN} count={craftGold} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell align="right">Total Gold:</TableCell>
                  <TableCell align="right">
                    <Currency
                      type={CURRENCY.COIN}
                      count={(craftGold || 0) + (objectHasProperties(materialList)
                        ? Object.entries(materialList).map(([itemId, quantity]) => quantity * (itemPrice[itemId] || 0) * 10000).reduce((a, b) => a + b)
                        : 0)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell align="right">Total Labor:</TableCell>
                  <TableCell align="right">{craftLabor || 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {materialList.length}
          </div>
        </DialogContent>
      </div>
    );
  }
}

const mapStateToProps = ({ gameData: { items, recipes }, proficiencies, itemPrice, display: { mobile } }) => ({
  items,
  proficiencies,
  recipes,
  itemPrice,
  mobile,
});

const mapDispatchToProps = {
  calculateLabor,
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeViewer);
