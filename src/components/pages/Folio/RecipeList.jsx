import {
  AppBar,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  fetchItems,
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import Item from 'components/Item';
import RecipeViewer from 'components/pages/Folio/RecipeViewer';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { setTitle } from 'utils/string';

class RecipeList extends Component {
  static propTypes = {
    recipeId: number,
    vocation: string,
    searchResults: array,
  };

  static defaultProps = {};

  state = {
    recipe: {},
  };

  constructor(props) {
    super();
    this.getRecipeList(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getRecipeList(nextProps);
  }

  getPageVocation = (props) => {
    const { vocation } = props || this.props;
    const search = vocation.toLowerCase().match(/search-(product|material)/);
    let loadId = vocation;
    let itemId = null;
    if (search) {
      itemId = new URLSearchParams(document.location.search).get('itemId');
      loadId = search[1].substr(0, 1) + itemId;
    }

    return { pagePath: search && search[0] || vocation, loadId, recipeType: search && search[1], itemId };
  };

  getRecipeList(props) {
    const { pagePath, recipeType, itemId } = this.getPageVocation(props);
    if (itemId) {
      if (recipeType === 'material') {
        props.fetchRecipeByMaterial(itemId);
      } else {
        props.fetchRecipeByProduct(itemId);
      }
    } else {
      props.fetchRecipeByVocation(pagePath);
    }
  }

  setRecipe = (recipe) => () => {
    const { pagePath, itemId } = this.getPageVocation();
    let query = '';
    if (itemId) {
      query = `?itemId=${itemId}`;
    }
    if (!recipe) {
      push(`/folio/${pagePath}${query}`);
    } else {
      push(`/folio/${pagePath}/${recipe}${query}`);
    }
  };

  render() {
    const { recipes, vocations, vocation, items, loaded, recipeId, mobile } = this.props;
    const { loadId, recipeType, itemId } = this.getPageVocation();

    const vocationName = vocations.find(v => v.toLowerCase() === vocation.toLowerCase()) || '...';

    setTitle(`${!recipeType ? vocationName : pathOr('...', [itemId, 'name'])(items)} Recipes - Folio`);

    return (
      <div className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Tooltip title="Back">
              <IconButton onClick={() => push('/folio')} style={{ margin: '0 8px 0 -16px' }} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h5"
              className="title-text"
            >
              {!recipeType && vocationName}
              {recipeType === 'product' && `Search by Product: ${pathOr('...', [itemId, 'name'])(items)}`}
              {recipeType === 'material' && `Search by Material: ${pathOr('...', [itemId, 'name'])(items)}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className="recipe-wrapper">
          <List className="recipe-list">
            {loaded === loadId && Object.values(recipes).sort(sortBy('name')).map(recipe => (
              <ListItem button dense={!mobile} onClick={this.setRecipe(recipe.id)} key={recipe.id}>
                <ListItemAvatar className={mobile ? 'extended' : ''}>
                  <Item id={recipe.item} grade={recipe.grade} inline={!mobile} count={recipe.quantity} />
                </ListItemAvatar>
                <ListItemText primary={recipe.name} />
              </ListItem>
            ))}
          </List>
          {!mobile &&
          <div className="recipe-viewer recipe-viewer-inline">
            <RecipeViewer recipeId={recipeId} />
          </div>}
          {mobile &&
          <Dialog
            open={Boolean(recipeId)}
            onClose={this.setRecipe()}
            fullScreen
            className="recipe-viewer"
          >
            <RecipeViewer
              recipeId={recipeId}
              handleClose={this.setRecipe()}
            />
          </Dialog>
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ gameData, display: { mobile } }) => ({
  ...gameData,
  vocations: pathOr([], ['vocations'])(gameData).map(v => v.name),
  mobile,
});

const mapDispatchToProps = {
  fetchRecipeByVocation,
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
