import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  fetchCategories,
  fetchVocations,
} from 'actions/gameData';
import { push } from 'actions/navigate';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isNumber } from 'utils/number';
import { objectHasProperties } from 'utils/object';
import {
  pascalCase,
  setTitle,
} from 'utils/string';
import * as VocationIcon from '../../images/vocation';
import FolioHeader from './FolioHeader';
import RecipeList from './RecipeList';
import RecipeViewer from './RecipeViewer';

class Folio extends Component {
  static propTypes = {
    fetchCategories: func.isRequired,
    fetchVocations: func.isRequired,
    match: object.isRequired,
    params: object,
    vocation: string,
    recipeId: string,
    vocations: array,
    mobile: bool.isRequired,
    items: object.isRequired,
    categories: object.isRequired,
  };

  state = {
    viewerHeight: 0,
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchVocations();
  }

  getProps = () => {
    const { match: { params: { vocation, recipeId } }, vocations, categories, mobile, items } = this.props;
    const params = new URLSearchParams(document.location.search);
    const materialQuery = params.get('material');
    const productQuery = params.get('product');
    return { vocation, vocations, recipeId: Number(recipeId), categories, mobile, materialQuery, productQuery, items };
  };

  setRecipe = (recipe) => () => {
    const { materialQuery, productQuery, vocation } = this.getProps();
    let query = '';
    if (productQuery) {
      query = `?product=${productQuery}`;
    } else if (materialQuery) {
      query = `?material=${materialQuery}`;
    }

    if (!recipe) {
      push(`/folio/${vocation}${query}`);
    } else {
      push(`/folio/${vocation}/${recipe}${query}`);
    }
  };

  handleSizeChange = (viewerHeight) => {
    this.setState({ viewerHeight });
  };

  render() {
    const { vocation, vocations, recipeId, categories, mobile, materialQuery, productQuery, items } = this.getProps();
    const { viewerHeight } = this.state;

    const vocationName = vocation ? vocations.find(v => v.toLowerCase() === vocation.toLowerCase()) : null;

    const searchItemName = (isNumber(productQuery || materialQuery))
      ? pathOr('...', [Number.parseInt(productQuery || materialQuery), 'name'])(items)
      : (productQuery || materialQuery);

    if (!recipeId) {
      if (vocationName || searchItemName) {
        setTitle(`${vocationName || searchItemName} Recipes - Folio`);
      } else {
        setTitle('Folio');
      }
    }

    return (
      <>
        <FolioHeader />
        {vocation
          // show the list of recipes and recipe viewer
          ? <div className="section">
            <AppBar position="static">
              <Toolbar variant="dense">
                <Tooltip title="Back">
                  <IconButton onClick={() => push('/folio')} style={{ margin: '0 8px 0 -16px' }} color="inherit">
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="h5" className="title-text">
                  {vocationName || `Search: ${searchItemName}`}
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper className="recipe-wrapper">
              {objectHasProperties(categories) &&
              <RecipeList
                vocation={vocation}
                materialQuery={materialQuery}
                productQuery={productQuery}
                handleClick={this.setRecipe}
                maxHeight={!mobile ? viewerHeight : 0}
              />}
              {!mobile &&
              <div className="recipe-viewer recipe-viewer-inline">
                <RecipeViewer recipeId={recipeId} onSizeChange={this.handleSizeChange} />
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
          // show the vocation list
          : <div className="section">
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h5" className="title-text">Browse by Vocation</Typography>
              </Toolbar>
            </AppBar>
            <Paper>
              <div className="vocation-grid">
                {vocations.filter(v => v !== 'Mining' && v !== 'Larceny').map(vocation => (
                  <Link to={`/folio/${vocation.toLowerCase()}`} key={vocation}>
                    <Paper elevation={5} className="vocation">
                      <img src={VocationIcon[pascalCase(vocation)]} alt={vocation} />
                      <Typography>{vocation}</Typography>
                    </Paper>
                  </Link>
                ))}
              </div>
            </Paper>
          </div>}
      </>
    );
  }
}

const mapStateToProps = ({ gameData: { vocations, categories, items }, display: { mobile } }) => ({
  vocations: vocations.map(v => v.name).sort(),
  items,
  categories,
  mobile,
});

const mapDispatchToProps = {
  fetchCategories,
  fetchVocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Folio);
