import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Icon,
  IconButton,
  Input,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Close,
  Settings,
  Share,
} from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  CAN_SPEAK,
  setAlert,
  setCargoShip,
  setSpeak,
  speak,
} from 'actions/schedule';
import cn from 'classnames';
import CopyDialog from 'components/CopyDialog';
import { ZONE } from 'constants/map';
import {
  CARGO_ALERTS,
  CARGO_ID,
  CARGO_SCHEDULE,
} from 'constants/schedule';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  arrayOf,
  bool,
  func,
  oneOf,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { randomString } from 'utils/string';
import { hhmmssFromDate } from 'utils/time';

const getNextIndex = (index) => index + 1 === CARGO_SCHEDULE.length ? 0 : index + 1;

class CargoShip extends Component {
  static propTypes = {
    port: oneOf([ZONE.SOLIS_HEADLANDS, ZONE.TWO_CROWNS]),
    endTime: string,
    setCargoShip: func.isRequired,
    setAlert: func.isRequired,
    setSpeak: func.isRequired,
    alerts: arrayOf(string),
    speak: bool,
    mobile: bool,
    playCue: func.isRequired,
    doSpeak: func.isRequired,
  };

  static defaultProps = {
    port: null,
    endTime: null,
  };

  state = {
    open: false,
    share: false,
    setup: {
      port: '',
      mm: '',
      ss: '',
    },
    stepIndex: 0,
    endTime: 0,
    shipPosition: 0,
    menu: null,
  };

  interval = null;

  mm = React.createRef();

  ss = React.createRef();

  handleOpenMenu = (e) => {
    this.setState({ menu: e.target });
  };

  handleCloseMenu = () => {
    this.setState({ menu: null });
  };

  toggleDialog = () => {
    const { open } = this.state;
    if (open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true, setup: { port: '', mm: '', ss: '' } });
    }
  };

  handleSetupChange = (field) => (e, v) => {
    let value = pathOr(v, ['target', 'value'])(e);
    this.setState({ setup: { ...this.state.setup, [field]: value } });
  };

  handleTimeChange = (key) => (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value !== '') {
      const num = Number.parseInt(value);
      let max = 59;
      if (key === 'mm') {
        max = 30;
      }
      value = Math.min(num, max);
    }

    if (key === 'mm' && String(value).length === 2) {
      this.ss.current.select();
    }

    this.setState({ setup: { ...this.state.setup, [key]: value !== '' ? Number.parseInt(value) : '' } });
  };

  handleEnter = (e) => {
    const { setup } = this.state;
    if (e.key === 'Enter' && setup.port && (String(setup.mm).length !== 0 || String(setup.ss).length !== 0)) {
      this.submitSetup();
    }
  };

  submitSetup = () => {
    const { setup } = this.state;
    const { port, mm, ss } = setup;
    const duration = (mm * 60) + ss;
    const props = { port, endTime: moment().add(duration, 'seconds').format() };
    this.props.setCargoShip(props);
    this.initialize(props);
    this.toggleDialog();
  };

  componentDidMount() {
    this.initialize(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initialize = ({ port: portInitial, endTime: endTimeInitial }) => {
    // prevent multiple ticks
    if (this.interval) {
      clearInterval(this.interval);
    }
    // do not attempt to initialize if there's no saved data
    if (!portInitial) {
      return;
    }

    const now = moment();

    let port = portInitial;
    let step = CARGO_SCHEDULE.find(step => step.port === port);
    let stepIndex = CARGO_SCHEDULE.indexOf(step);
    let stepEnd = moment(endTimeInitial);

    let lastPortProps = null;
    // fast-forward the state in case of re-visit
    while (stepEnd.isBefore(now)) {
      stepIndex = getNextIndex(stepIndex);
      step = CARGO_SCHEDULE[stepIndex];
      port = step.port;
      stepEnd.add(step.duration, 'seconds');
      if (step.port) {
        lastPortProps = { port: step.port, endTime: stepEnd.format() };
      }
    }

    // save the fast-forward
    if (lastPortProps) {
      this.props.setCargoShip(lastPortProps);
    }

    this.setState({
      stepIndex,
      endTime: stepEnd,
    }, () => {
      this.interval = setInterval(this.timerTick, 1000);
    });
  };

  timerTick = () => {
    const { alerts, speak, playCue, doSpeak } = this.props;
    let { stepIndex, endTime } = this.state;
    let shipPosition;
    const now = moment();
    let step = CARGO_SCHEDULE[stepIndex];
    let timeRemaining = endTime.diff(now) / 1000;

    // continue to check the time remaining in case of tab desync
    while (timeRemaining < 0) {
      stepIndex = getNextIndex(stepIndex);
      step = CARGO_SCHEDULE[stepIndex];
      timeRemaining = step.duration + timeRemaining;
      endTime = moment().add(timeRemaining, 'seconds');

      if (step.port) {
        // update the save so it doesn't have to fast-forward as much on next load
        this.props.setCargoShip({ port: step.port, endTime: endTime.format() });
      }
    }
    if (step.port) {
      shipPosition = 0;
    } else {
      shipPosition = timeRemaining;
    }

    // check if alert
    const alert = alerts
    .map(aId => CARGO_ALERTS[aId])
    .find(a => (a.portFrom === step.portFrom || a.portTo === step.portTo) && a.duration === Math.round(timeRemaining));

    if (alert) {
      const { cue, speech } = alert;
      console.log(alert, cue, speech);
      playCue(cue);

      if (speak) {
        setTimeout(() => doSpeak(speech), 500);
      }
    }

    this.setState({ stepIndex, timeRemaining, shipPosition, endTime });
  };

  toggleShare = () => {
    this.setState({ share: !this.state.share });
  };

  render() {
    const { port, alerts, setAlert, speak, setSpeak, mobile } = this.props;
    const { open, setup, stepIndex, endTime, shipPosition, share, menu } = this.state;
    const now = moment();
    const step = CARGO_SCHEDULE[stepIndex];
    let message;
    let shareMessage = '';

    if (!port || !endTime) {
      message = 'Initialize the timer by clicking the Settings cog.';
    } else {
      const endSec = endTime.diff(now) / 1000;
      message = <>
        The cargo ship is {step.text}.<br />
        It will {step.port ? 'depart' : 'arrive'} in {hhmmssFromDate(endSec * 1000)}.
      </>;
      const arriveMin = Math.round(endSec / 60);
      shareMessage = `Cargo ship is ${step.port ? `leaving ${step.portFrom}`
        : `arriving at ${step.portTo}`} in ${Math.floor(endSec / 60) === 0 ? 'less than a minute'
        : `${arriveMin} minute${arriveMin > 1 ? 's' : ''}`}.`;
    }

    return [
      <Paper className="cargo-ship event-list" key="cargo-timer">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Icon><img src={'/images/event_type/exploration.png'} alt="Cargo Ship" /></Icon>
            <Typography variant="subtitle1" className="title-text">Cargo Ship</Typography>
            <Tooltip title="Setup Timer">
              <IconButton onClick={this.toggleDialog} color="inherit">
                <Settings />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Timer">
              <span>
                <IconButton onClick={this.toggleShare} disabled={!port || !endTime} color="inherit">
                  <Share />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Configure alerts">
              <IconButton
                onClick={this.handleOpenMenu}
                className="super-btn"
              >
                <NotificationsIcon
                  className={cn({ 'notif-fade': alerts.length === 0 })}
                  color="inherit"
                />
                {alerts.length > 0 &&
                <Typography className="super-text" color="primary">{alerts.length}</Typography>}
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
          <div
            className={cn('cargo-icon ship', { moving: !step.port, reverse: step.reverse })}
            style={{ [step.reverse ? 'left' : 'right']: `${(shipPosition / step.duration) * 100}%` }}
          />
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
        maxWidth="sm"
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
          <Typography>To setup the timer, the ship must currently be docked at a port.</Typography>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">What port is the ship at?</FormLabel>
            <RadioGroup name="port" value={setup.port} onChange={this.handleSetupChange('port')} row>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={ZONE.SOLIS_HEADLANDS}
                value={ZONE.SOLIS_HEADLANDS}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label={ZONE.TWO_CROWNS}
                value={ZONE.TWO_CROWNS}
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">What is the remaining time on the &quot;Cargo Ship
              Anchored&quot; buff?</FormLabel>
            <div className="duration-pick">
              <Input
                id="mm"
                placeholder="20"
                endAdornment="m"
                inputProps={{
                  maxLength: 2,
                  ref: this.mm,
                }}
                value={setup.mm}
                onChange={this.handleTimeChange('mm')}
                onKeyPress={this.handleEnter}
              />
              <Input
                id="ss"
                placeholder="00"
                endAdornment="s"
                inputProps={{
                  maxLength: 2,
                  ref: this.ss,
                }}
                value={setup.ss}
                onChange={this.handleTimeChange('ss')}
                onKeyPress={this.handleEnter}
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.submitSetup}
            color="primary"
            disabled={!setup.port || (String(setup.mm).length === 0 && String(setup.ss).length === 0)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>,
      <CopyDialog
        open={share}
        handleClose={this.toggleShare}
        title="Share Ship Timer"
        label="Cargo Ship Status"
        value={shareMessage}
        key="share-cargo"
      />,
      <Menu
        id="alert-menu"
        anchorEl={menu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
        open={Boolean(menu)}
        onClose={this.handleCloseMenu}
        className="alert-menu"
        autoFocus={false}
        key="alert-menu"
        variant="menu"
      >
        <ListItem tabIndex={null} dense={!mobile}>
          <ListItemText>Alert Types:</ListItemText>
        </ListItem>
        <MenuItem disabled dense={!mobile}>
          <ListItemIcon>
            <CheckBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Audio Cue</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={setSpeak(CARGO_ID, !speak)}
          dense={!mobile}
          disabled={!CAN_SPEAK}
          divider
        >
          <ListItemIcon>
            {speak
              ? <CheckBoxIcon fontSize="small" color="primary" />
              : <CheckBoxOutlineBlankIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Audio Message</ListItemText>
        </MenuItem>
        <ListItem tabIndex={null} dense={!mobile}>
          <ListItemText>Alert Times:</ListItemText>
          <ListItemSecondaryAction>
            <Tooltip title="Clear all">
                <span>
                  <IconButton size="small" onClick={setAlert(CARGO_ID, '')} disabled={alerts.length === 0}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        {Object.entries(CARGO_ALERTS).map(([key, option]) => (
          <MenuItem
            dense={!mobile}
            onClick={setAlert(CARGO_ID, key)}
            key={`alert-opt-${randomString(16)}-${key}`}
          >
            <ListItemIcon>
              {alerts.includes(key)
                ? <CheckBoxIcon fontSize="small" color="primary" />
                : <CheckBoxOutlineBlankIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText>{option.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>,
    ];
  }
}

const mapStateToProps = ({ calendar: { cargoShip, alerts, speak }, display: { mobile } }) => ({
  ...cargoShip,
  alerts: pathOr([], [CARGO_ID])(alerts),
  speak: pathOr(false, [CARGO_ID])(speak),
  mobile,
});

const mapDispatchToProps = {
  setCargoShip,
  setAlert,
  setSpeak,
  doSpeak: speak,
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoShip);
