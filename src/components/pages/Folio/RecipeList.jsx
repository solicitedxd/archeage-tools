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
  fetchRecipeByVocation,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import Item from 'components/Item';
import RecipeViewer from 'components/pages/Folio/RecipeViewer';
import React, { Component } from 'react';
import {
  array,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';

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
    props.fetchRecipeByVocation(props.vocation);
  }

  setRecipe = (recipe) => () => {
    const { vocation } = this.props;
    if (!recipe) {
      push(`/folio/${vocation}`);
    } else {
      push(`/folio/${vocation}/${recipe}`);
    }
  };

  render() {
    const { recipes, vocations, vocation, loaded, recipeId, mobile } = this.props;

    return (
      <div className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Tooltip title="Back">
              <IconButton onClick={() => push('/folio')} style={{ margin: '0 8px 0 -16px' }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h5"
              className="title-text"
            >
              {vocations.find(v => v.toLowerCase() === vocation.toLowerCase()) || '...'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className="recipe-wrapper">
          <List className="recipe-list">
            {loaded === vocation && Object.values(recipes).sort(sortBy('name')).map(recipe => (
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
  mobile,
});

const mapDispatchToProps = {
  fetchRecipeByVocation,
  fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
