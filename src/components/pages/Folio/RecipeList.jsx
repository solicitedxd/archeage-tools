import {
  AppBar,
  Collapse,
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  fetchItems,
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import Item from 'components/Item';
import RecipeViewer from 'components/pages/Folio/RecipeViewer';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  array,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { objectHasProperties } from 'utils/object';
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
    recipeList: [],
    categories: {},
  };

  constructor(props) {
    super();
    this.getRecipeList(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getRecipeList(nextProps);

    if (objectHasProperties(nextProps.categories) !== objectHasProperties(this.props.categories)
      || !equals(this.props.recipes, nextProps.recipes)) {
      this.updateRecipeList(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.props, nextProps) || !equals(this.state, nextState);
  }

  getPageVocation = (props) => {
    const vocation = pathOr('', ['vocation'])(props || this.props);
    const search = vocation.toLowerCase().match(/search-(product|material)/);
    let loadId = vocation;
    let itemId = null;
    if (search) {
      itemId = Number.parseInt(new URLSearchParams(document.location.search).get('itemId')) || '0';
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

  updateRecipeList = (props) => {
    const { recipes, categories } = props;

    const recipeList = [];
    const getCategory = (id) => {
      let category = null;
      const searchCat = (cat) => {
        if (cat.id === id) {
          category = cat;
          return true;
        }
        if (cat.children) {
          return cat.children.some(searchCat);
        }
        return false;
      };

      recipeList.some(searchCat);

      if (category === null) {
        category = Object.assign({ id: null }, categories[id], { recipes: [], children: [] });

        let _category = category;
        while (Boolean(_category.parent)) {
          let parent = getCategory(_category.parent);
          if (!parent.children.find(c => equals(c, _category))) {
            parent.children.push(_category);
          }
          _category = parent;
        }

        if (!recipeList.find(c => equals(c, _category))) {
          recipeList.push(_category);
        }
      }

      return category;
    };

    // move recipes into their categories
    Object.values(recipes).forEach(recipe => {
      const category = getCategory(recipe.category);
      category.recipes.push(recipe);
    });

    this.setState({ recipeList });
  };

  toggleCategory = (id) => () => {
    const { categories } = this.state;
    this.setState({ categories: { ...categories, [id]: !Boolean(categories[id]) } });
  };

  renderRecipeCategory = (category) => {
    const { mobile } = this.props;
    const { categories } = this.state;
    const { id } = category;
    const open = !Boolean(categories[id]);

    return (
      <div className="recipe-category" key={id}>
        <ListItem button dense disableGutters className="category-title" onClick={this.toggleCategory(id)}>
          <ListItemAvatar className="category-toggle">
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </ListItemAvatar>
          {category.name || 'Uncategorized'}
        </ListItem>
        <Collapse in={open}>
          <div className="category-children">
            {category.children.length > 0 &&
            category.children.map(child => this.renderRecipeCategory(child))}
            {category.recipes.length > 0 &&
            <List disablePadding>
              {category.recipes.map(recipe => (
                <ListItem button dense={!mobile} onClick={this.setRecipe(recipe.id)} key={recipe.id}>
                  <ListItemAvatar className={mobile ? 'extended' : ''}>
                    <Item id={recipe.item} grade={recipe.grade} inline={!mobile} count={recipe.quantity} />
                  </ListItemAvatar>
                  <ListItemText primary={recipe.name} />
                </ListItem>
              ))}
            </List>}
          </div>
        </Collapse>
      </div>
    );
  };

  render() {
    const { vocations, vocation, items, loaded, recipeId, mobile } = this.props;
    const { loadId, recipeType, itemId } = this.getPageVocation();
    const { recipeList } = this.state;

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
          {loaded === loadId &&
          <Typography component="div" className="recipe-list">
            {recipeList.map(cat => this.renderRecipeCategory(cat))}
          </Typography>}
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
