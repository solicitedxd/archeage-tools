import {
  AppBar,
  Dialog,
  DialogContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { closeDialog } from 'actions/display';
import {
  CHARACTERS,
  DIALOG_MY_GAME,
  PROFICIENCIES,
  RESIDENCE,
  SERVER,
} from 'constants/display';
import React, { Component } from 'react';
import {
  bool,
  func,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import Proficiencies from './Proficiencies';
import Residence from './Residence';
import Server from './Server';

const initialState = {
  [CHARACTERS]: false,
  [RESIDENCE]: false,
  [PROFICIENCIES]: false,
  [SERVER]: false,
};

class MyGame extends Component {
  static propTypes = {
    mobile: bool,
    open: bool,
    onClose: func.isRequired,
    dialogFunc: string,
  };

  static defaultProps = {
    mobile: false,
    open: false,
  };

  state = { ...initialState };

  componentDidUpdate(prevProps) {
    const { dialogFunc, open } = this.props;
    if (!prevProps.open && open) {
      const state = { ...initialState };
      if (dialogFunc !== null) {
        state[dialogFunc] = true;
      }
      this.setState(state);
    }
  }

  handleChange = (section) => () => {
    this.setState({ [section]: !this.state[section] });
  };

  render() {
    const { mobile, open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={mobile}
        maxWidth="lg"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">My ArcheAge</Typography>
            <Tooltip title="Close">
              <IconButton onClick={onClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent className="my-game-wrapper">
          <ExpansionPanel expanded={this.state[SERVER]} onChange={this.handleChange(SERVER)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Server</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Server />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {/*
           <ExpansionPanel expanded={this.state[CHARACTERS]} onChange={this.handleChange(CHARACTERS)}>
           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <Typography>My Characters</Typography>
           </ExpansionPanelSummary>
           <ExpansionPanelDetails>
           </ExpansionPanelDetails>
           </ExpansionPanel>
           */}
          <ExpansionPanel expanded={this.state[RESIDENCE]} onChange={this.handleChange(RESIDENCE)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Residence</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Residence />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state[PROFICIENCIES]} onChange={this.handleChange(PROFICIENCIES)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Proficiencies</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Proficiencies />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ gameData: { vocations }, proficiencies, display: { mobile, dialog, dialogFunc } }) => ({
  vocations,
  proficiencies,
  mobile,
  open: dialog === DIALOG_MY_GAME,
  dialogFunc,
});

const mapDispatchToProps = {
  onClose: closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGame);
