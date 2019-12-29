import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
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
} from '@material-ui/icons';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { setCargoShip } from 'actions/calendar';
import cn from 'classnames';
import { ZONE } from 'constants/map';
import { CARGO_SCHEDULE } from 'constants/schedule';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  number,
  oneOf,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { hhmmssFromSeconds } from 'utils/thunderstruck';

const maximumDuration = () => moment().hour(0).minute(20).second(0).millisecond(0);
const getNextIndex = (index) => index + 1 === CARGO_SCHEDULE.length ? 0 : index + 1;

class CargoShip extends Component {
  static propTypes = {
    port: oneOf([ZONE.SOLIS_HEADLANDS, ZONE.TWO_CROWNS]),
    duration: number,
    timestamp: string,
  };

  static defaultProps = {
    port: null,
    duration: 0,
    timestamp: null,
  };

  state = {
    open: false,
    setup: {
      port: '',
      duration: maximumDuration(),
    },
    stepIndex: 0,
    timeRemaining: 0,
    shipPosition: 0,
  };
  interval = null;

  toggleDialog = () => {
    const { open } = this.state;
    if (open) {
      this.setState({ open: !open });
    } else {
      this.setState({ open: !open, setup: { port: '', duration: maximumDuration(), timestamp: null } });
    }
  };

  handleSetupChange = (field) => (e, v) => {
    let value = pathOr(v, ['target', 'value'])(e);
    if (field === 'duration') {
      value = e;
      if (value && value.isAfter(maximumDuration())) {
        value = maximumDuration();
      }
    }
    this.setState({ setup: { ...this.state.setup, [field]: value } });
  };

  submitSetup = () => {
    const { setup } = this.state;
    // convert the duration moment to seconds
    const durMoment = setup.duration;
    const duration = (durMoment.minutes() * 60) + durMoment.seconds() + (durMoment.milliseconds() / 1000);
    const props = { ...setup, duration, timestamp: moment().format() };
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

  initialize = ({ port: portInitial, duration: durationInitial, timestamp: timestampRaw }) => {
    // prevent multiple ticks
    if (this.interval) {
      clearInterval(this.interval);
    }
    // do not attempt to initialize if there's no saved data
    if (!portInitial) {
      return;
    }

    const now = moment();
    const timestamp = moment(timestampRaw);

    let port = portInitial;
    let duration = durationInitial;
    let step = CARGO_SCHEDULE.find(step => step.port === port);
    let stepIndex = CARGO_SCHEDULE.indexOf(step);
    let stepEnd = timestamp.clone().add(duration, 'second');

    let lastPortProps = null;
    // fast-forward the state in case of re-visit
    while (stepEnd.isBefore(now)) {
      stepIndex = getNextIndex(stepIndex);
      step = CARGO_SCHEDULE[stepIndex];
      duration = step.duration;
      port = step.port;
      if (step.port) {
        lastPortProps = { port: step.port, duration: step.duration, timestamp: stepEnd.format() };
      }
      stepEnd.add(duration, 'seconds');
    }

    duration = stepEnd.diff(now, 'seconds');

    // save the fast-forward
    if (lastPortProps) {
      this.props.setCargoShip(lastPortProps);
    }

    this.setState({
      stepIndex,
      timeRemaining: duration,
    }, () => {
      this.interval = setInterval(this.timerTick, 1000);
    });
  };

  timerTick = () => {
    let { stepIndex, timeRemaining, shipPosition } = this.state;
    let step = CARGO_SCHEDULE[stepIndex];
    timeRemaining -= 1;
    if (timeRemaining < 0) {
      stepIndex = getNextIndex(stepIndex);
      step = CARGO_SCHEDULE[stepIndex];
      timeRemaining = step.duration + timeRemaining;

      // update the save so it doesn't have to fast-forward as much on next load
      if (step.port) {
        this.props.setCargoShip({ port: step.port, duration: step.duration, timestamp: moment().format() });
      }
    }
    if (step.port) {
      shipPosition = 0;
    } else {
      shipPosition = timeRemaining;
    }
    this.setState({ stepIndex, timeRemaining, shipPosition });
  };

  render() {
    const { port } = this.props;
    const { open, setup, stepIndex, timeRemaining, shipPosition } = this.state;
    const step = CARGO_SCHEDULE[stepIndex];
    let message;

    if (!port) {
      message = 'Initialize the timer by clicking the Settings cog.';
    } else {
      message = <React.Fragment>
        Cargo Ship is {step.text}<br />
        It will {step.port ? 'depart' : 'arrive'} in {hhmmssFromSeconds(Math.abs(timeRemaining))}.
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
          <div
            className={cn('cargo-icon ship', { moving: !Boolean(step.port), reverse: step.reverse })}
            style={{ [step.reverse ? 'left' : 'right']: `${((shipPosition / step.duration) * 308) - 10}px` }}
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
            <FormLabel component="legend">What is the remaining time on the "Cargo Ship Anchored" buff?</FormLabel>
            <div className="duration-pick">
              <KeyboardTimePicker
                ampm={false}
                views={['minutes', 'seconds']}
                format="mm:ss"
                value={setup.duration}
                onChange={this.handleSetupChange('duration')}
                open={false}
                KeyboardButtonProps={{
                  style: {
                    display: 'none',
                  },
                }}
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.submitSetup}
            color="primary"
            disabled={!setup.port || !setup.duration}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>,
    ];
  }
}

const mapStateToProps = ({ calendar: { cargoShip } }) => ({
  ...cargoShip,
});

const mapDispatchToProps = {
  setCargoShip,
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoShip);
