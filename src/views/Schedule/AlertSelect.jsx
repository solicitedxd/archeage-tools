import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  CAN_SPEAK,
  setAlert,
  setSpeak,
} from 'actions/schedule';
import cn from 'classnames';
import { ALERT_OPTIONS } from 'constants/schedule';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { getReminderTime } from 'utils/schedule';
import {
  randomString,
  substitute,
} from 'utils/string';

class AlertSelect extends Component {
  static propTypes = {
    id: number.isRequired,
    alerts: object,
    mobile: bool,
    setAlert: func,
    nextTime: object.isRequired,
    speak: object,
    setSpeak: func.isRequired,
  };

  static defaultProps = {
    alerts: [],
    mobile: false,
  };

  state = {
    menu: null,
  };

  handleOpenMenu = (e) => {
    this.setState({ menu: e.target });
  };

  handleCloseMenu = () => {
    this.setState({ menu: null });
  };

  render() {
    const { id, alerts, mobile, setAlert, speak, setSpeak, nextTime } = this.props;
    const { menu } = this.state;
    const menuOpen = Boolean(menu);
    const eventAlerts = pathOr([], [id])(alerts);
    const isSpeak = pathOr(false, [id])(speak);

    return (
      <>
        <Tooltip title="Configure alerts">
          <IconButton
            size="small"
            onClick={this.handleOpenMenu}
            className="super-btn"
          >
            <NotificationsIcon
              fontSize="small"
              className={cn({ 'notif-fade': eventAlerts.length === 0 })}
              color={eventAlerts.length > 0 ? 'primary' : 'inherit'}
            />
            {eventAlerts.length > 0 &&
            <div className="super-text color-white">{eventAlerts.length}</div>}
          </IconButton>
        </Tooltip>
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
          open={menuOpen}
          onClose={this.handleCloseMenu}
          className="alert-menu"
          autoFocus={false}
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
            onClick={setSpeak(id, !isSpeak)}
            dense={!mobile}
            disabled={!CAN_SPEAK}
            divider
          >
            <ListItemIcon>
              {isSpeak
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
                  <IconButton size="small" onClick={setAlert(id, '')} disabled={eventAlerts.length === 0}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          {Object.entries(ALERT_OPTIONS).map(([key, option]) => (
            <MenuItem
              dense={!mobile}
              onClick={setAlert(id, key)}
              key={`alert-opt-${randomString(16)}-${key}`}
            >
              <ListItemIcon>
                {eventAlerts.includes(key)
                  ? <CheckBoxIcon fontSize="small" color="primary" />
                  : <CheckBoxOutlineBlankIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{substitute(option.name, { time: getReminderTime(nextTime, option) / 60 })}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = ({ calendar: { alerts, speak }, display: { mobile } }) => ({
  alerts,
  speak,
  mobile,
});

const mapDispatchToProps = {
  setAlert,
  setSpeak,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertSelect);
