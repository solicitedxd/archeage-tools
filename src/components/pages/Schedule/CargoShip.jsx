import {
  AppBar,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Close,
  Settings,
} from '@material-ui/icons';
import cn from 'classnames';
import { ZONE } from 'constants/map';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  number,
  oneOf,
} from 'react-proptypes';

class CargoShip extends Component {
  static propTypes = {
    port: oneOf([ZONE.SOLIS_HEADLANDS, ZONE.TWO_CROWNS]),
    duration: number,
    timestamp: number,
  };

  static defaultProps = {
    port: null,
    duration: 0,
    timestamp: null,
  };

  state = {
    open: false,
    setup: {
      port: null,
      duration: 0,
      timestamp: null,
    },
  };

  toggleDialog = () => {
    const { open } = this.state;
    if (open) {
      this.setState({ open: !open });
    } else {
      this.setState({ open: !open, setup: { port: null, duration: 0, timestamp: null } });
    }
  };

  handleSetupChange = (field) => (e, v) => {
    const value = pathOr(v, ['target', 'value'])(e);
    this.setState({ setup: { ...this.state.setup, [field]: value } });
  };

  componentDidMount() {
    this.initialize(this.props);
  }

  initialize = ({ port, duration, timestamp }) => {

  };

  render() {
    const { port } = this.props;
    const { open, setup } = this.state;
    console.log(setup);
    let message;

    if (!port) {
      message = 'Initialize the timer by clicking the Settings cog.';
    } else {
      message = <React.Fragment>
        Cargo Ship is sailing from Solis to Two Crowns.<br />
        It will arrive in 00:00.
      </React.Fragment>;
    }

    return [
      <Paper className="cargo-ship" key="cargo-timer">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Cargo Ship</Typography>
            <Tooltip title="Setup Timer">
              <IconButton className="cargo-settings-btn" onClick={this.toggleDialog}>
                <Settings />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className="cargo-slider">
          <div className="cargo-rail" />
          <Tooltip title="Solis Headlands Trade Outlet">
            <div className="cargo-icon austera" />
          </Tooltip>
          <Tooltip title="Two Crowns Trade Outlet">
            <div className="cargo-icon two-crowns" />
          </Tooltip>
          <div className={cn('cargo-icon ship', { moving: true, reverse: false })} />
        </div>
        <div className="cargo-text">
          <Typography>
            {message}
          </Typography>
        </div>
      </Paper>,
      <Dialog
        open={open}
        key="cargo-settings"
        onClose={this.toggleDialog}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Cargo Ship Setup</Typography>
            <Tooltip title="Close">
              <IconButton onClick={this.toggleDialog}>
                <Close />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Typography>In order to setup the timer, the ship must currently be docked at a port.</Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">What port is the ship at?</FormLabel>
            <RadioGroup name="port" value={setup.port} onChange={this.handleSetupChange('port')} row>
              <FormControlLabel control={<Radio color="primary" />} label={ZONE.SOLIS_HEADLANDS} value={ZONE.SOLIS_HEADLANDS} />
              <FormControlLabel control={<Radio color="primary" />} label={ZONE.TWO_CROWNS} value={ZONE.TWO_CROWNS} />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">What is the duration on the "Cargo Ship Anchored" buff?</FormLabel>
            <TextField />
          </FormControl>
        </DialogContent>
      </Dialog>,
    ];
  }
}

export default CargoShip;
