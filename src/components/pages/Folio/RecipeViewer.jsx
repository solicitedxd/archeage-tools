import {
  AppBar,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { fetchRecipe } from 'actions/gameData';
import cn from 'classnames';
import Currency from 'components/Currency';
import Item from 'components/Item';
import { CURRENCY } from 'constants/items';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  func,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';

class RecipeViewer extends Component {
  static propTypes = {
    recipeId: number,
    handleClose: func,
  };

  static defaultProps = {
    recipeId: null,
    handleClose: null,
  };

  state = {
    recipe: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.recipeId !== nextProps.recipeId) {
      this.loadRecipe(nextProps.recipeId);
    }
  }

  componentDidMount() {
    const { recipeId } = this.props;
    if (recipeId) {
      this.loadRecipe(recipeId);
    }
  }

  loadRecipe = (recipeId) => {
    const { recipes } = this.props;
    if (recipes.hasOwnProperty(recipeId)) {
      this.setState({ recipe: recipes[recipeId] });
    } else {
      fetchRecipe(recipeId)
      .then((recipe) => this.setState({ recipe }))
      .catch(() => {
      });
    }
  };

  render() {
    const { items, handleClose } = this.props;
    const { recipe } = this.state;

    return (
      <>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">
              {recipe.name}
            </Typography>
            {handleClose &&
            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
            }
          </Toolbar>
        </AppBar>
        <DialogContent className="body-container">
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
            <Typography variant="subtitle2" className={cn({ 'craft-locked': recipe.requiredProficiency > 0 })}>
              {recipe.requiredProficiency > 0 && `Proficiency: ${recipe.vocation}`}&nbsp;
            </Typography>
            <Typography
              variant="subtitle2"
              className={cn('craft-req-prof', { 'craft-locked': recipe.requiredProficiency > 0 })}
            >
              {recipe.requiredProficiency === 230000 ?
                <>
                  <div className="famed-icon locked" />
                  <span>Max Proficiency Required</span>
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
              {recipe.name && `Labor Cost: ${recipe.labor}`}&nbsp;
            </Typography>
            <div className="craft-materials">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  className="craft-item sm"
                  key={recipe.materials && recipe.materials[i] ? recipe.materials[i].item : `material-${i}`}
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
            <Typography variant="subtitle2" className="craft-header">Cost</Typography>
            <span className="craft-gold"><Currency type={CURRENCY.COIN} count={recipe.gold || 0} inline /></span>
          </div>
        </DialogContent>
      </>
    );
  }
}

const mapStateToProps = ({ gameData: { recipes, items } }) => ({
  recipes,
  items,
});

export default connect(mapStateToProps)(RecipeViewer);
