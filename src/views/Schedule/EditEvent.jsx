import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { setEvent } from 'actions/gameData';
import config from 'config';
import { REGIONS } from 'constants/myGame';
import {
  ALERT_DEFAULT,
  DAY,
  DAY_ABBR,
} from 'constants/schedule';
import {
  bool,
  func,
  number,
  object,
} from 'prop-types';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { getDayNum } from 'utils/schedule';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';
import * as EventIcon from '../../images/event';

const getIconName = (url) => {
  try {
    const s = url.split('/');
    return s[s.length - 1].split('.')[0];
  } catch (e) {
    return '';
  }
};

class EditEvent extends Component {
  static propTypes = {
    id: number,
    open: bool.isRequired,
    onClose: func.isRequired,
    setEvent: func.isRequired,
    mobile: bool,
    eventTypes: object,
  };

  static defaultProps = {
    id: null,
  };

  state = {
    formData: {},
    avatarSelect: null,
    editTime: false,
    timeData: {},
    loading: false,
    error: null,
  };

  form = React.createRef();

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        formData: {},
        avatarSelect: null,
        editTime: false,
        timeData: {},
        loading: false,
        error: null,
      });
    }
    if (nextProps.id !== this.props.id && nextProps.open) {
      this.loadEvent(nextProps.id);
    }
  }

  loadEvent = (id) => {
    xhr.get(substitute(`${config.endpoints.service.event}?showIds=true`, { eventId: id }))
    .then(({ data }) => {
      this.setState({ formData: data });
    })
    .catch(() => null);
  };

  handleChange = (field, value) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: value } });
  };

  handleChangeTime = (field, value, cb = () => null) => {
    const { timeData } = this.state;
    if (field === 'days') {
      value = value.sort((a, b) => getDayNum(a) - getDayNum(b));
    }
    this.setState({ timeData: { ...timeData, [field]: value } }, cb);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    if (!formData.icon) {
      this.setState({ error: 'Icon is required.' });
      return;
    }
    if (!formData.name) {
      this.setState({ error: 'Event Name is required.' });
      return;
    }
    if (!formData.eventType) {
      this.setState({ error: 'Type is required.' });
      return;
    }

    this.setState({ loading: true, error: null });

    xhr.post(config.endpoints.service.events, formData)
    .then(({ data }) => {
      this.props.setEvent(data);
      this.props.onClose();
    })
    .catch(error => {
      const message = pathOr('Failed to save event.', ['data', 'errorMessage'])(error);
      console.log(error);
      this.setState({ error: message, loading: false });
    });
  };

  toggleAvatar = (e) => {
    if (e) {
      this.setState({ avatarSelect: e.target });
    } else {
      this.setState({ avatarSelect: null });
    }
  };

  editTime = (editTime = true) => () => {
    let timeData = {};
    if (editTime !== true && editTime !== false) {
      timeData = pathOr({}, ['state', 'formData', 'times', editTime])(this);
    }
    this.setState({ editTime, timeData });
  };

  deleteTime = (id) => () => {
    const { times: timesOld } = this.state.formData;
    const times = timesOld.splice(id, 1);
    this.setState({ times });
  };

  saveTime = (e) => {
    e.preventDefault();

    const { formData, timeData, editTime } = this.state;
    if (!formData.times) {
      formData.times = [];
    }
    const { times } = formData;
    const timeId = times[editTime] || {};
    // overwrite days
    const timeRecord = {
      reminderTime: ALERT_DEFAULT,
      ...timeId,
      ...timeData,
      // empty array implies all 7 days
      days: (timeData.days || []).length === 7 ? [] : (timeData.days || []),
    };
    if (editTime === true) {
      times.push(timeRecord);
    } else {
      times[editTime] = timeRecord;
    }
    this.setState({ formData: { ...formData, times }, editTime: false });
  };

  handleTime = (e) => {
    let { value } = e.target;
    if (!value) return null;
    let [hh, mm] = value.split(':');
    return `${hh}:${mm}:00`;
  };

  render() {
    const { id, open, onClose, mobile, eventTypes } = this.props;
    const { formData: { name, icon, eventType, description, link, times, disabled }, avatarSelect, editTime, timeData, error, loading } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={mobile}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography className="title-text">{id ? 'Edit' : 'New'} Event</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form autoComplete="off" onSubmit={this.handleSubmit} ref={this.form}>
            <div className="event-form">
              <div className="avatar-opt">
                <Avatar src={icon ? `/images/event/${icon}.png` : null} onClick={this.toggleAvatar} />
                <Typography>{icon || 'Select an icon.'}</Typography>
              </div>
              <TextField
                required
                id="event-name"
                label="Event Name"
                value={name || ''}
                onChange={(e) => this.handleChange('name', e.target.value)}
              />
              <FormControl required>
                <InputLabel id="event-type-select">Type</InputLabel>
                <Select
                  labelId="event-type-select"
                  id="event-type"
                  value={eventType || ''}
                  onChange={(e) => this.handleChange('eventType', e.target.value)}
                >
                  {Object.values(eventTypes).map(type => (
                    <MenuItem
                      value={type.id}
                      key={`etype-${type.id}`}
                    >
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="event-desc"
                label="Description"
                value={description || ''}
                onChange={(e) => this.handleChange('description', e.target.value)}
                multiline
              />
              <TextField
                id="event-link"
                label="Link"
                value={link || ''}
                onChange={(e) => this.handleChange('link', e.target.value)}
              />
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={disabled || false}
                      onChange={(_, disabled) => this.handleChange('disabled', disabled)}
                      name="disabled"
                    />}
                  label="Disabled"
                />
              </div>
              <div className="times">
                <Typography>Times</Typography>
                <div className="chips">
                  {(times || []).map((time, timeId) => (
                    <Chip
                      key={`time-${timeId}`}
                      icon={<Avatar>{time.region || 'GT'}</Avatar>}
                      label={`${time.time} ${time.days.length > 0 && time.days.length < 7
                        ? time.days.map(day => DAY_ABBR[day]).join('') : ''}`}
                      onClick={this.editTime(timeId)}
                      onDelete={this.deleteTime(timeId)}
                      variant="outlined"
                      color={editTime === timeId ? 'primary' : 'secondary'}
                    />
                  ))}
                  {editTime === false &&
                  <IconButton onClick={this.editTime()}>
                    <AddIcon />
                  </IconButton>}
                </div>
              </div>
            </div>
          </form>
          {editTime !== false &&
          <Paper elevation={3}>
            <form autoComplete="off" onSubmit={this.saveTime} className="time-form">
              <Typography>{editTime === true ? 'Add Time' : 'Edit Time'}</Typography>
              <FormControl
                style={{ width: 75 }}
                disabled={Boolean(timeData.gameTime)}
              >
                <InputLabel id="region-label" shrink>Region</InputLabel>
                <Select
                  labelId="region-label"
                  id="region"
                  value={timeData.region || ''}
                  onChange={(e) => this.handleChangeTime('region', e.target.value)}
                >
                  {[null, ...Object.values(REGIONS)].map(region => (
                    <MenuItem
                      value={region}
                      key={`region-${region}`}
                    >
                      {region || 'None'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="start-time"
                label="Start Time"
                margin="dense"
                type="time"
                required
                value={timeData.time || ''}
                onChange={(e) => this.handleChangeTime('time', this.handleTime(e))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900,
                }}
              />
              <TextField
                id="duration"
                label="Duration"
                margin="dense"
                type="time"
                value={timeData.duration || ''}
                onChange={(e) => this.handleChangeTime('duration', this.handleTime(e))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900,
                }}
              />
              <TextField
                id="in-game-time"
                label="Game Time?"
                margin="dense"
                type="time"
                value={timeData.gameTime || ''}
                onChange={(e) => {
                  const gameTime = this.handleTime(e);
                  this.handleChangeTime('gameTime', gameTime, () => {
                    if (gameTime) {
                      this.handleChangeTime('region', null);
                    }
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900,
                }}
              />
              <TextField
                id="time-name"
                label="Name"
                margin="dense"
                value={timeData.name || ''}
                onChange={(e) => this.handleChangeTime('name', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder={`${name || 'Event Name'}: ...`}
              />
              <TextField
                className="start-message"
                id="time-message"
                label="Start Message"
                margin="dense"
                value={timeData.startMessage || ''}
                onChange={(e) => this.handleChangeTime('startMessage', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Alternate message for when this event starts."
              />
              <TextField
                id="reminder-time"
                label="Reminder Time"
                margin="dense"
                type="time"
                value={timeData.reminderTime || ''}
                onChange={(e) => this.handleChangeTime('reminderTime', this.handleTime(e))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900,
                }}
              />
              <TextField
                className="start-message"
                id="time-reminder-message"
                label="Reminder Message"
                margin="dense"
                value={timeData.reminderMessage || ''}
                onChange={(e) => this.handleChangeTime('reminderMessage', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Alternate message for when this event is starting soon."
              />
              <FormControl className="day-select">
                <InputLabel id="time-days-label">Days</InputLabel>
                <Select
                  labelId="time-days-label"
                  id="time-days"
                  multiple
                  value={timeData.days || []}
                  onChange={(e) => this.handleChangeTime('days', e.target.value)}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className="day-chips">
                      {selected.map((value) => (
                        <Chip key={value} label={DAY[value]} className="day-chip" />
                      ))}
                    </div>
                  )}
                >
                  {Object.entries(DAY).map(([key, name]) => (
                    <MenuItem key={key} value={key} className="day-item">
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton type="submit"><CheckIcon /></IconButton>
              <IconButton onClick={this.editTime(false)}><CloseIcon /></IconButton>
            </form>
          </Paper>}
          <Popover
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            anchorEl={avatarSelect}
            open={Boolean(avatarSelect)}
            elevation={2}
            onClose={() => this.toggleAvatar()}
          >
            <div className="avatar-select">
              {Object.entries(EventIcon).sort(sortBy(0)).map(([key, url]) => (
                <Tooltip title={getIconName(url)} key={key}>
                  <Avatar
                    src={url}
                    onClick={() => {
                      this.handleChange('icon', getIconName(url));
                      this.toggleAvatar();
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </Popover>
          {error &&
          <Box color="error.main">
            <Typography>{error}</Typography>
          </Box>}
          <DialogActions>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => this.form.current.dispatchEvent(new Event('submit'))}
              disabled={loading}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ gameData: { eventTypes }, display: { mobile } }) => ({
  mobile,
  eventTypes,
});

const mapDispatchToProps = {
  setEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
