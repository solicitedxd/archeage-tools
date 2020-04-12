import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { setAlert } from 'actions/schedule';
import cn from 'classnames';
import {
  ALERT_1,
  ALERT_2,
  ALERT_3,
  ALERT_DEFAULT,
  ALERT_START,
} from 'constants/schedule';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { hhmmssToInt } from 'utils/schedule';

class AlertSelect extends Component {
  static propTypes = {
    id: number.isRequired,
    alerts: object,
    mobile: bool,
    setAlert: func,
    nextTime: object.isRequired,
  };

  static defaultProps = {
    alerts: [],
    mobile: false,
    setAlert: () => null,
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
    const { id, alerts, mobile, setAlert, nextTime } = this.props;
    const { menu } = this.state;
    const menuOpen = Boolean(menu);
    const eventAlerts = pathOr([], [id])(alerts);

    return (
      <>
        <Tooltip title="Configure alerts">
          <IconButton
            size="small"
            onClick={this.handleOpenMenu}
          >
            <NotificationsIcon fontSize="small" className={cn({ 'notif-fade': eventAlerts.length === 0 })} />
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
          <MenuItem disabled selected dense={!mobile}>
            <ListItemIcon>
              <CheckIcon fontSize={mobile ? 'default' : 'small'} />
            </ListItemIcon>
            <ListItemText>Audio Cue</ListItemText>
          </MenuItem>
          <MenuItem selected={false} dense={!mobile} divider>
            <ListItemIcon>
              {/*<CheckIcon fontSize={mobile ? 'default' : 'small'} />*/}
              <span />
            </ListItemIcon>
            <ListItemText>Audio Message</ListItemText>
          </MenuItem>
          <ListItem tabIndex={null} dense={!mobile}>
            <ListItemText>Alert Times:</ListItemText>
          </ListItem>
          <MenuItem selected={eventAlerts.includes(ALERT_START)} dense={!mobile} onClick={setAlert(id, ALERT_START)}>
            <ListItemIcon>
              {eventAlerts.includes(ALERT_START) ?
                <CheckIcon fontSize={mobile ? 'default' : 'small'} /> : <span />}
            </ListItemIcon>
            <ListItemText>Start of Event</ListItemText>
          </MenuItem>
          <MenuItem selected={eventAlerts.includes(ALERT_1)} dense={!mobile} onClick={setAlert(id, ALERT_1)}>
            <ListItemIcon>
              {eventAlerts.includes(ALERT_1) ?
                <CheckIcon fontSize={mobile ? 'default' : 'small'} /> : <span />}
            </ListItemIcon>
            <ListItemText>
              {Math.floor(hhmmssToInt(nextTime.reminderTime || ALERT_DEFAULT) / 3 * 60)} minutes before
            </ListItemText>
          </MenuItem>
          <MenuItem selected={eventAlerts.includes(ALERT_2)} dense={!mobile} onClick={setAlert(id, ALERT_2)}>
            <ListItemIcon>
              {eventAlerts.includes(ALERT_2) ?
                <CheckIcon fontSize={mobile ? 'default' : 'small'} /> : <span />}
            </ListItemIcon>
            <ListItemText>
              {Math.floor(hhmmssToInt(nextTime.reminderTime || ALERT_DEFAULT) * 60)} minutes before
            </ListItemText>
          </MenuItem>
          <MenuItem selected={eventAlerts.includes(ALERT_3)} dense={!mobile} onClick={setAlert(id, ALERT_3)}>
            <ListItemIcon>
              {eventAlerts.includes(ALERT_3) ?
                <CheckIcon fontSize={mobile ? 'default' : 'small'} /> : <span />}
            </ListItemIcon>
            <ListItemText>
              {Math.floor(hhmmssToInt(nextTime.reminderTime || ALERT_DEFAULT) * 120)} minutes before
            </ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  }
}

const mapStateToProps = ({ calendar: { alerts }, display: { mobile } }) => ({
  alerts,
  mobile,
});

const mapDispatchToProps = {
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertSelect);
