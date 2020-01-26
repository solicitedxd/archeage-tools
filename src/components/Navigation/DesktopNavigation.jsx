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
import WarningIcon from '@material-ui/icons/Warning';
import {
  openDialog,
  setDarkMode,
  setMobile,
} from 'actions/display';
import cn from 'classnames';
import { DIALOG_PROFICIENCY } from 'constants/display';
import navigation from 'constants/navigation';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  injectPatreon,
  isMobileBrowser,
} from 'utils/display';
import NavMenu from './NavMenu';

class DesktopNavigation extends Component {
  static propTypes = {
    mobile: bool,
    setMobile: func,
    darkMode: bool,
    setDarkMode: func,
    session: object.isRequired,
    menuItems: array.isRequired,
    userMenu: object,
  };

  static defaultProps = {
    mobile: false,
    darkMode: false,
    setDarkMode: () => {
    },
    setMobile: () => {
    },
    userMenu: null,
  };

  handleDarkMode = () => {
    const { darkMode, setDarkMode } = this.props;
    setDarkMode(!darkMode);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const wasPatron = this.props.session.patreon && this.props.session.patreon.pledge > 0;
    const isNotPatron = !nextProps.session.patreon || nextProps.session.patreon.pledge === 0;
    if (wasPatron && isNotPatron || isNotPatron && this.props.mobile !== nextProps.mobile) {
      injectPatreon();
    }
  }

  componentDidMount() {
    const { session } = this.props;

    // load Patreon button script post-load
    if (pathOr(0, ['patreon', 'pledge'])(session) === 0) {
      injectPatreon();
    }
  }

  render() {
    const { mobile, setMobile, darkMode, menuItems, session, myAccountUrl, openDialog } = this.props;

    return (
      <>
        {navigation.map(navLink => <NavMenu key={navLink.name} {...navLink} />)}
        {session.isAuthenticated && !session.verified &&
        <Tooltip title="E-mail is not verified. Click to verify.">
          <MuiLink href={myAccountUrl}>
            <WarningIcon className="verify-warn" />
          </MuiLink>
        </Tooltip>}
        {session.isAuthenticated &&
        <Typography className="user-welcome">Hello, <b>{session.username}</b>!</Typography>}
        {!mobile && pathOr(0, ['patreon', 'pledge'])(session) === 0 &&
        <div className="user-welcome">
          <a href="https://www.patreon.com/bePatron?u=12806740" target="_blank"
             data-patreon-widget-type="become-patron-button">Become a Patron!</a>
        </div>}
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
          children={<>
            <ListItem dense divider>
              <ListItemText primary={<Typography variant="overline">{session.isAuthenticated ? session.username
                : 'Account'}</Typography>} />
            </ListItem>
            {menuItems}
            <MenuItem button onClick={() => openDialog(DIALOG_PROFICIENCY)}>Proficiencies</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleDarkMode}>
              {darkMode ? 'Light' : 'Dark'} Mode
              {darkMode ? <BrightnessHighIcon className="menu-icon-right" /> : <Brightness4Icon
                className="menu-icon-right" />}
            </MenuItem>
            {isMobileBrowser() &&
            <MenuItem onClick={() => setMobile(true)}>
              Switch to Mobile <PhoneIphoneIcon className="menu-icon-right" />
            </MenuItem>}
          </>}
        />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
