import {
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Skeleton } from '@material-ui/lab';
import {
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
  searchRecipes,
} from 'actions/gameData';
import Item from 'components/Item';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  func,
  number,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { isNumber } from 'utils/number';

class RecipeList extends Component {
  static propTypes = {
    productQuery: oneOfType([string, number]),
    materialQuery: oneOfType([string, number]),
    vocation: string,
    handleClick: func,
    maxHeight: number,
  };

  static defaultProps = {};

  state = {
    recipeList: [],
    categories: {},
    loaded: '',
  };

  componentDidMount() {
    this.checkRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    // ignore state updates
    if (!equals(prevState, this.state)) return;

    const { vocation, productQuery, materialQuery } = this.props;
    const { loaded } = this.state;

    if (vocation !== prevProps.vocation || productQuery !== prevProps.productQuery || materialQuery !== prevProps.materialQuery) {
      this.setState({ recipeList: [] });
    }

    if (loaded !== this.getRecipeKey()) {
      this.checkRecipes();
    }
  }

  getRecipeKey = () => {
    const { vocation, productQuery, materialQuery } = this.props;

    let recipeKey;
    if (vocation === 'search') {
      if (productQuery) {
        recipeKey = `product-${productQuery}`;
      } else if (materialQuery) {
        recipeKey = `material-${materialQuery}`;
      }
    } else {
      recipeKey = vocation;
    }
    return recipeKey;
  };

  checkRecipes = () => {
    const { recipes, vocationRecipes } = this.props;

    this.getRecipeList();

    const recipeKey = this.getRecipeKey();

    if (vocationRecipes[recipeKey] && vocationRecipes[recipeKey].every((id) => Boolean(recipes[id]))) {
      this.updateRecipeList(vocationRecipes[recipeKey].map(id => recipes[id]));
    }
  };

  getRecipeList = () => {
    const { fetchRecipeByProduct, fetchRecipeByMaterial, searchRecipes, fetchRecipeByVocation } = this.props;
    const { vocation, productQuery, materialQuery } = this.props;

    if (vocation === 'search') {
      if (isNumber(productQuery || materialQuery)) {
        if (productQuery) {
          fetchRecipeByProduct(productQuery);
        } else {
          fetchRecipeByMaterial(materialQuery);
        }
      } else if (productQuery) {
        searchRecipes(productQuery, 'product');
      } else if (materialQuery) {
        searchRecipes(materialQuery, 'material');
      }
    } else {
      fetchRecipeByVocation(vocation);
    }
  };

  updateRecipeList = (recipes) => {
    const { categories } = this.props;

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
    recipes.forEach(recipe => {
      const category = getCategory(recipe.category);
      category.recipes.push(recipe);
      category.recipes = category.recipes.sort(sortBy('rank'));
    });

    this.setState({ recipeList, loaded: this.getRecipeKey() });
  };

  toggleCategory = (id) => () => {
    const { categories } = this.state;
    this.setState({ categories: { ...categories, [id]: !Boolean(categories[id]) } });
  };

  renderRecipeCategory = (category) => {
    const { mobile, handleClick } = this.props;
    const { categories } = this.state;
    const { id } = category;
    const open = !Boolean(categories[id]);

    return (
      <div className="recipe-category" key={`rcat-${id}`}>
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
                <ListItem button dense={!mobile} onClick={handleClick(recipe.id)} key={`rlist-${recipe.id}`}>
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
    const { maxHeight } = this.props;
    const { recipeList, loaded } = this.state;

    if (loaded !== this.getRecipeKey()) {
      const skeletons = [];
      for (let i = 0; i < 10; i++) {
        skeletons.push(<Skeleton variant="text" key={`skele-${i}`} />);
      }

      return (
        <div className="recipe-list">
          {skeletons}
        </div>
      );
    }

    return (
      <Typography component="div" className="recipe-list" style={{ maxHeight: maxHeight > 0 ? maxHeight : null }}>
        {recipeList.map(cat => this.renderRecipeCategory(cat))}
      </Typography>
    );
  }
}

const mapStateToProps = ({ gameData: { categories, recipes, vocationRecipes }, display: { mobile } }) => ({
  categories,
  recipes,
  vocationRecipes,
  mobile,
});

const mapDispatchToProps = {
  searchRecipes,
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
