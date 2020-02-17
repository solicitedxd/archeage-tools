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
import { isNumber } from 'utils/number';

class RecipeList extends Component {
  static propTypes = {
    productQuery: oneOfType([string, number]),
    materialQuery: oneOfType([string, number]),
    vocation: string,
    handleClick: func,
  };

  static defaultProps = {};

  state = {
    recipeList: [],
    categories: {},
  };

  componentDidMount() {
    this.getRecipeList(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getRecipeList(nextProps);
  }

  getRecipeList(props) {
    const { vocation, productQuery, materialQuery } = props;
    this.setState({ loading: true });

    if (vocation === 'search') {
      if (isNumber(productQuery || materialQuery)) {
        if (productQuery) {
          fetchRecipeByProduct(productQuery)
          .then(this.updateRecipeList);
        } else {
          fetchRecipeByMaterial(materialQuery)
          .then(this.updateRecipeList);
        }
      } else if (productQuery) {
        props.searchRecipes(productQuery, 'product')
        .then(this.updateRecipeList);
      } else if (materialQuery) {
        props.searchRecipes(materialQuery, 'material')
        .then(this.updateRecipeList);
      }
    } else {
      fetchRecipeByVocation(vocation)
      .then(this.updateRecipeList);
    }
  }

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
    });

    this.setState({ recipeList, loading: false });
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
                <ListItem button dense={!mobile} onClick={handleClick(recipe.id)} key={recipe.id}>
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
    const { recipeList, loading } = this.state;

    if (loading) {
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
      <Typography component="div" className="recipe-list">
        {recipeList.map(cat => this.renderRecipeCategory(cat))}
      </Typography>
    );
  }
}

const mapStateToProps = ({ gameData: { categories }, display: { mobile } }) => ({
  categories,
  mobile,
});

const mapDispatchToProps = {
  searchRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
