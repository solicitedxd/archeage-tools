import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { fetchVocations } from 'actions/gameData';
import RecipeList from 'components/pages/Folio/RecipeList';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pascalCase } from 'utils/string';
import * as VocationIcon from '../../../images/vocation/';
import FolioHeader from './FolioHeader';

class Folio extends Component {
  componentDidMount() {
    this.props.fetchVocations();
  }

  render() {
    const { match: { params: { vocation, recipeId } }, vocations } = this.props;

    return (
      <>
        <FolioHeader />
        {vocation ?
          <RecipeList vocation={vocation} recipeId={recipeId ? Number.parseInt(recipeId) : null} /> :
          <div className="section">
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

const mapStateToProps = ({ gameData: { vocations } }) => ({
  vocations: vocations.map(v => v.name).sort(),
});

const mapDispatchToProps = {
  fetchVocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Folio);
