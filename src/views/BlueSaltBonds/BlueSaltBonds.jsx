import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { openDialog } from 'actions/display';
import AdContainer from 'components/AdContainer';
import {
  DIALOG_MY_GAME,
  SERVER,
} from 'constants/display';
import React, { Component } from 'react';
import { func } from 'react-proptypes';
import { connect } from 'react-redux';
import { setTitle } from 'utils/string';
import BondCalculator from './BondCalculator';
import CurrentBonds from './CurrentBonds';

class BlueSaltBonds extends Component {
  static propTypes = {
    openDialog: func.isRequired,
  };

  render() {
    const { openDialog } = this.props;

    setTitle('Blue Salt Bonds');

    return (
      <div className="tool-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Blue Salt Bonds</Typography>
              <Tooltip title="Change Server">
                <IconButton onClick={() => openDialog(DIALOG_MY_GAME, SERVER)} color="inherit">
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Paper>

        <div className="bonds-container section">
          <CurrentBonds />
          <BondCalculator />
        </div>

        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapDispatchToProps = {
  openDialog,
};

export default connect(null, mapDispatchToProps)(BlueSaltBonds);
