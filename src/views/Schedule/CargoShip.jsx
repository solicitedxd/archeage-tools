import {
  AppBar,
  Button,
  Checkbox,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { openDialog } from 'actions/display';
import {
  fetchCargoTimer,
  fetchServers,
  updateCargoTimer,
} from 'actions/gameData';
import {
  CAN_SPEAK,
  setAlert,
  setSpeak,
  speak,
} from 'actions/schedule';
import cn from 'classnames';
import IfPerm from 'components/IfPerm/IfPerm';
import {
  DIALOG_MY_GAME,
  SERVER,
} from 'constants/display';
import { ZONE } from 'constants/map';
import { REGIONS } from 'constants/myGame';
import {
  CARGO_ALERTS,
  CARGO_ID,
  CARGO_SCHEDULE,
  MAINTENANCE_TIME,
} from 'constants/schedule';
import moment from 'moment';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  arrayOf,
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { pad } from 'utils/number';
import { objectHasProperties } from 'utils/object';
import { randomString } from 'utils/string';
import { hhmmssFromDate } from 'utils/time';

const getNextIndex = (index) => {
  let i = index + 1;
  while (i >= CARGO_SCHEDULE.length) {
    i -= CARGO_SCHEDULE.length;
  }
  return i;
};

class CargoShip extends Component {
  static propTypes = {
    setAlert: func.isRequired,
    setSpeak: func.isRequired,
    alerts: arrayOf(string),
    speak: bool,
    mobile: bool,
    playCue: func.isRequired,
    doSpeak: func.isRequired,
    server: number,
    servers: object,
    cargoTimers: object,
    fetchServers: func.isRequired,
    fetchCargoTimer: func.isRequired,
    updateCargoTimer: func.isRequired,
    openDialog: func.isRequired,
  };

  static defaultProps = {
    port: null,
    endTime: null,
  };

  state = {
    open: false,
    setup: {
      port: '',
      mm: '',
      ss: '',
      noLinkedUpdate: false,
    },
    stepIndex: 0,
    endTime: 0,
    shipPosition: 0,
    menu: null,
    updated: false,
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
      this.setState({ open: true, setup: { port: '', mm: '', ss: '', noLinkedUpdate: false } });
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

  handleNoLink = (e, noLinkedUpdate) => {
    this.setState({ setup: { ...this.state.setup, noLinkedUpdate } });
  };

  handleEnter = (e) => {
    const { setup } = this.state;
    if (e.key === 'Enter' && setup.port && (String(setup.mm).length !== 0 || String(setup.ss).length !== 0)) {
      this.submitSetup();
    }
  };

  submitSetup = () => {
    const { server: serverId, cargoTimers } = this.props;
    const { setup } = this.state;
    const { port, mm, ss, noLinkedUpdate } = setup;
    const cargoTimer = cargoTimers[serverId];
    cargoTimer.port = port;
    cargoTimer.duration = `${pad(mm, 2)}:${pad(ss, 2)}`;
    cargoTimer.noLinkedUpdate = noLinkedUpdate;
    this.props.updateCargoTimer(cargoTimer);
    this.toggleDialog();
  };

  componentDidMount() {
    this.props.fetchServers();
    this.props.fetchCargoTimer();
    this.initialize();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (this.props.server !== prevProps.server || !equals(this.props.cargoTimers, prevProps.cargoTimers)) {
      this.initialize();
    }
  }

  initialize = () => {
    const { server: serverId, servers, cargoTimers } = this.props;
    if (!serverId || !objectHasProperties(servers) || !objectHasProperties(cargoTimers)) {
      return;
    }

    // prevent multiple ticks
    if (this.interval) {
      clearInterval(this.interval);
    }

    const server = servers[serverId];
    const region = pathOr(REGIONS.NA, ['region'])(server);
    const [dd, hh, mm, ss] = (MAINTENANCE_TIME[region] || '').split(':');
    const lastChange = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
    if (lastChange.isAfter(moment.now())) {
      lastChange.subtract(1, 'day');
    }
    while (lastChange.weekday() !== Number(dd)) {
      lastChange.subtract(1, 'day');
    }

    const cargoTimer = pathOr({}, [serverId])(cargoTimers);
    const updated = server && objectHasProperties(cargoTimers) && moment(cargoTimer.timestamp).isAfter(lastChange);

    // do not continue if there is no data
    if (!updated) {
      this.setState({ updated });
      return;
    }

    const now = moment();

    let { port, duration, timestamp } = cargoTimer;
    let step = CARGO_SCHEDULE.find(step => step.port === Number.parseInt(port));
    let stepIndex = CARGO_SCHEDULE.indexOf(step);
    let stepEnd = moment(timestamp);
    const [mm2, ss2] = (duration || '').split(':');
    stepEnd.add(mm2, 'minute').add(ss2, 'second');

    // fast-forward the state from the original time
    while (stepEnd.isBefore(now)) {
      stepIndex = getNextIndex(stepIndex);
      step = CARGO_SCHEDULE[stepIndex];
      port = step.port;
      stepEnd.add(step.duration, 'seconds');
    }

    this.setState({
      stepIndex,
      endTime: stepEnd,
      updated,
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
    }
    if (step.port) {
      shipPosition = 0;
    } else {
      shipPosition = timeRemaining;
    }

    // check if alert
    const alert = alerts
    .map(aId => CARGO_ALERTS[aId])
    .find(a => ((step.portFrom && a.portFrom === step.portFrom) || (step.portTo && a.portTo === step.portTo)) && a.duration === Math.round(timeRemaining));

    if (alert) {
      const { cue, speech } = alert;
      playCue(cue);

      if (speak) {
        setTimeout(() => doSpeak(speech), 500);
      }
    }

    this.setState({ stepIndex, timeRemaining, shipPosition, endTime });
  };

  render() {
    const { alerts, setAlert, speak, setSpeak, servers, server: serverId, mobile, openDialog } = this.props;
    const { open, setup, stepIndex, endTime, shipPosition, menu, updated } = this.state;
    const now = moment();
    let eventStepTime = moment(endTime);
    const step = CARGO_SCHEDULE[stepIndex];

    const server = servers[serverId];
    const serverName = pathOr('???', ['name'])(server);

    return [
      <Paper className="cargo-ship event-list" key="cargo-timer">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Icon><img src={'/images/event_type/exploration.png'} alt="Cargo Ship" /></Icon>
            <Typography variant="subtitle1" className="title-text">[{serverName}] Cargo Ship</Typography>
            <IfPerm permission={`cargo.${serverName.toLowerCase()}`}>
              <Tooltip title={`Edit ${serverName} Timer`}>
                <IconButton onClick={this.toggleDialog} color="inherit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </IfPerm>
            <Tooltip title="Change Server">
              <IconButton onClick={() => openDialog(DIALOG_MY_GAME, SERVER)} color="inherit">
                <HomeIcon />
              </IconButton>
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
          {!server &&
          <Typography>Select a server to see the cargo ship location.</Typography>}
          {server && !updated &&
          <Typography>The cargo ship has not been updated since the last maintenance.</Typography>}
          {server && updated &&
          <>
            <Typography>Cargo ship is {step.text}.</Typography>
            <br />
            <Table size="small" stickyHeader className="timer-table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Event
                  </TableCell>
                  <TableCell>
                    Time
                  </TableCell>
                  <TableCell align="right">
                    Countdown
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(Array(CARGO_SCHEDULE.length).keys()).map((_, i) => {
                  const index = getNextIndex(stepIndex + i - 1);
                  const step = CARGO_SCHEDULE[index];
                  if (i > 0) {
                    eventStepTime.add(step.duration, 'seconds');
                  }
                  return (
                    <TableRow key={`cargo-${i}`}>
                      <TableCell>{step.next}</TableCell>
                      <TableCell>{eventStepTime.format('h:mm A')}</TableCell>
                      <TableCell align="right">{hhmmssFromDate(eventStepTime.diff(now))}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>}
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
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Typography>To setup the timer, the ship must currently be docked at a port.</Typography>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">What port is the ship at?</FormLabel>
            <RadioGroup name="port" value={Number.parseInt(setup.port)} onChange={this.handleSetupChange('port')} row>
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Solis Headlands"
                value={ZONE.SOLIS_HEADLANDS}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Two Crowns"
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
          <FormControl component="fieldset">
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Don't Update Sibling Realms"
              checked={setup.noLinkedUpdate}
              onChange={this.handleNoLink}
            />
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

const mapStateToProps = ({
                           calendar: { alerts, speak },
                           display: { mobile },
                           gameData: { cargoTimers, servers },
                           myGame: { server },
                         }) => ({
  cargoTimers,
  servers,
  server,
  alerts: pathOr([], [CARGO_ID])(alerts),
  speak: pathOr(false, [CARGO_ID])(speak),
  mobile,
});

const mapDispatchToProps = {
  setAlert,
  setSpeak,
  fetchServers,
  fetchCargoTimer,
  updateCargoTimer,
  openDialog,
  doSpeak: speak,
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoShip);
