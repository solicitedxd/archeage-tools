import {
  Checkbox,
  Collapse,
  FormControlLabel,
  Paper,
  Radio,
  Typography,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchRecipeByProduct } from 'actions/gameData';
import { calculateLabor } from 'actions/proficiencies';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import ItemPrice from 'components/Item/ItemPrice';
import NumberField from 'components/NumberField';
import { CURRENCY } from 'constants/items';
import React, { Component } from 'react';
import {
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';

class Material extends Component {
  static propTypes = {
    recipeId: number.isRequired,
    onUpdate: func.isRequired,
    item: number.isRequired,
    quantity: number,
    grade: number,
    recipes: object,
    materials: object,
    depth: number.isRequired,
    fetchRecipeByProduct: func.isRequired,
    proficiencies: object.isRequired,
    itemPrice: object.isRequired,
    calculateLabor: func.isRequired,
  };

  static defaultProps = {
    quantity: 1,
    grade: 1,
    materials: { value: 'gold' },
  };

  componentDidMount() {
    this.getRecipeComponents();
  }

  getRecipeComponents = () => {
    const { item, fetchRecipeByProduct } = this.props;
    fetchRecipeByProduct(item);
  };

  handleSelectOption = (e) => {
    this.props.onUpdate({ value: e.target.value });
  };

  handleUpdateMaterial = (itemId) => (materials) => {
    const { materials: materialsO, onUpdate } = this.props;
    onUpdate({ ...materialsO, [itemId]: materials });
  };

  handleUpdateLabor = (labor) => {
    const { materials, onUpdate } = this.props;
    onUpdate({ ...materials, labor });
  };

  handleUpdateSale = (e, sale) => {
    const { materials, onUpdate } = this.props;
    onUpdate({ ...materials, sale });
  };

  handleUpdateCollapse = (collapsed) => () => {
    const { materials, onUpdate } = this.props;
    onUpdate({ ...materials, collapsed });
  };

  render() {
    const { item, grade, quantity, recipes, recipeId, materials, proficiencies, itemPrice, calculateLabor, depth } = this.props;

    const subRecipes = Object.values(recipes).filter(recipe => recipe.id !== recipeId && recipe.item === item);
    const selectedRecipe = subRecipes.find(r => materials.value === String(r.id));

    return (
      <Paper elevation={depth} className="material-item paper-border">
        <div className="collapsible-left">
          <ItemLink id={item} grade={grade} noLink name={String(quantity)} />
          {(subRecipes.length > 0 || materials.collapsed) &&
          <Tooltip title={materials.collapsed ? 'Expand' : 'Collapse'} placement="top">
            <div className="collapse" onClick={this.handleUpdateCollapse(!materials.collapsed)} />
          </Tooltip>}
        </div>
        <div>
          <Collapse in={materials.collapsed}>
            <div className="collapsed-desc">
              {selectedRecipe
                ? <Typography>
                  Recipe: {selectedRecipe.quantity > 1 ? `[${selectedRecipe.quantity}]` : ''} {selectedRecipe.name}
                </Typography>
                : <Typography>
                  Purchase: <Currency type={CURRENCY.COIN} count={(itemPrice[item] || 0) * quantity * 10000}
                                      inline /> and {materials.labor || 0} labor
                </Typography>}
            </div>
          </Collapse>
          <Collapse in={!materials.collapsed}>
            <div className="material-choice">
              <div className="material-option">
                <FormControlLabel
                  control={
                    <Radio
                      checked={materials.value === 'gold'}
                      onChange={this.handleSelectOption}
                      value="gold"
                    />
                  }
                  label={<ItemPrice itemId={item} unitSize={quantity} />}
                />
                <NumberField
                  id={`item-labor-${item}`}
                  onChange={this.handleUpdateLabor}
                  value={materials.labor || 0}
                  inputStyle={{ width: 72 }}
                  endAdornment="Labor"
                  min={0}
                  max={100000}
                />
              </div>
              {subRecipes.map(recipe => (
                <div key={`opt-${item}-${recipe.id}`} className="material-option">
                  <Tooltip
                    title={
                      <div className="recipe-tooltip">
                        <div>Workbench: {recipe.workbench}</div>
                        <div>Proficiency: {recipe.vocation} {recipe.requiredProficiency > 0 ? recipe.requiredProficiency
                          : ''}</div>
                        <div>Labor: {calculateLabor(recipe.labor, recipe.vocation)}</div>
                        <div>Cost: <Currency type={CURRENCY.COIN} count={recipe.gold} inline /></div>
                      </div>
                    }
                    placement="bottom-start"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={materials.value === String(recipe.id)}
                          onChange={this.handleSelectOption}
                          value={recipe.id}
                        />
                      }
                      label={
                        <span
                          className={(proficiencies[recipe.vocation] || 0) < recipe.requiredProficiency ? 'craft-locked'
                            : ''}
                        >
                      {recipe.quantity > 1 ? `[${recipe.quantity}]` : ''} {recipe.name}
                    </span>
                      }
                    />
                  </Tooltip>
                  {materials.value === String(recipe.id) &&
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
                  </Tooltip>}
                  <Collapse in={materials.value === String(recipe.id)} unmountOnExit>
                    {recipe.materials && recipe.materials.map(mat => (
                      <ConnectedMaterial
                        key={`mat-${item}-${recipe.id}-${mat.item}`}
                        recipeId={recipeId}
                        {...mat}
                        quantity={Math.ceil(quantity / recipe.quantity) * mat.quantity}
                        materials={materials[mat.item]}
                        recipes={recipes}
                        onUpdate={this.handleUpdateMaterial(mat.item)}
                        depth={depth + 1}
                      />
                    ))}
                  </Collapse>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ proficiencies, itemPrice }) => ({
  proficiencies,
  itemPrice,
});

const mapDispatchToProps = {
  calculateLabor,
  fetchRecipeByProduct,
};

const ConnectedMaterial = connect(mapStateToProps, mapDispatchToProps)(Material);

export default ConnectedMaterial;
