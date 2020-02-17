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

  handleUpdateSale = (e, sale) => {
    const { materials, onUpdate } = this.props;
    onUpdate({ ...materials, sale });
  };

  render() {
    const { item, grade, quantity, recipes, recipeId, materials, proficiencies, calculateLabor, depth } = this.props;

    return (
      <Paper elevation={depth} className="material-item">
        <ItemLink id={item} grade={grade} noLink name={String(quantity)} />
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
          </div>
          {Object.values(recipes).filter(recipe => recipe.id !== recipeId && recipe.item === item).map(recipe => (
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
      </Paper>
    );
  }
}

const mapStateToProps = ({ proficiencies }) => ({
  proficiencies,
});

const mapDispatchToProps = {
  calculateLabor,
  fetchRecipeByProduct,
};

const ConnectedMaterial = connect(mapStateToProps, mapDispatchToProps)(Material);

export default ConnectedMaterial;
