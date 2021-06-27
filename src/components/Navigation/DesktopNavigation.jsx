import {
  Avatar,
  Divider,
  IconButton,
  Link as MuiLink,
  ListItem,
  ListItemText,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import WarningIcon from '@material-ui/icons/Warning';
import {
  openDialog,
  setDarkMode,
  setHideAds,
  setMobile,
} from 'actions/display';
import cn from 'classnames';
import { DIALOG_MY_GAME } from 'constants/display';
import navigation from 'constants/navigation';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { isMobileBrowser } from 'utils/display';
import NavMenu from './NavMenu';

class DesktopNavigation extends Component {
  static propTypes = {
    setMobile: func,
    darkMode: bool,
    setDarkMode: func,
    session: object.isRequired,
    menuItems: array.isRequired,
    userMenu: object,
    myAccountUrl: string,
    openDialog: func.isRequired,
    setHideAds: func.isRequired,
    hideAds: bool,
  };

  static defaultProps = {
    darkMode: false,
    userMenu: null,
    hideAds: false,
  };

  render() {
    const {
      setMobile,
      darkMode,
      setDarkMode,
      menuItems,
      session,
      myAccountUrl,
      openDialog,
      hideAds,
      setHideAds,
    } = this.props;

    return (
      <>
        {navigation.map(navLink => <NavMenu key={navLink.name} {...navLink} />)}
        {session.isAuthenticated && !session.verified &&
        <Tooltip title="E-mail is not verified. Click to verify.">
          <MuiLink href={myAccountUrl}>
            <WarningIcon className="verify-warn" />
          </MuiLink>
        </Tooltip>}
        <NavMenu
          name="My Account"
          button={
            <IconButton
              className="user-menu-icon"
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar src={session.avatarSrc} className={cn('avatar', { [session.avatarPlatform]: true })}>
                {!session.avatarSrc && <PersonIcon />}
              </Avatar>
            </IconButton>
          }
        >
          <>
            <ListItem dense divider>
              <ListItemText primary={<Typography variant="overline">{session.isAuthenticated ? session.username
                : 'Account'}</Typography>} />
            </ListItem>
            {menuItems}
            <MenuItem button onClick={() => openDialog(DIALOG_MY_GAME)}>My ArcheAge</MenuItem>
            <Divider />
            <MenuItem onClick={() => setDarkMode(!darkMode)}>
              <div className="menu-item-icon">
                <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
                {darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
              </div>
            </MenuItem>
            {isMobileBrowser() &&
            <MenuItem onClick={() => setMobile(true)}>
              <div className="menu-item-icon">
                <span>Switch to Mobile</span>
                <PhoneIphoneIcon />
              </div>
            </MenuItem>}
            <MenuItem onClick={() => setHideAds(!hideAds)}>
              <div className="menu-item-icon">
                <span>{hideAds ? 'Show' : 'Hide'} Ads</span>
                {hideAds ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </MenuItem>
          </>
        </NavMenu>
      </>
    );
  }
}

const mapStateToProps = ({ display }) => ({
  ...display,
});

const mapDispatchToProps = {
  setDarkMode,
  setMobile,
  openDialog,
  setHideAds,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
