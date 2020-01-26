import {
  Avatar,
  Divider,
  IconButton,
  Link as MuiLink,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
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
  setDarkMode,
  setMobile,
} from 'actions/display';
import cn from 'classnames';
import Link from 'components/Link';
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

class DesktopNavigation extends Component {
  static propTypes = {
    mobile: bool,
    setMobile: func,
    darkMode: bool,
    setDarkMode: func,
    session: object.isRequired,
    menuItems: array.isRequired,
    userMenu: object,
    handleOpen: func.isRequired,
    handleClose: func.isRequired,
    openProficiencies: func.isRequired,
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

  state = {
    anchorEl: {},
  };

  handleDarkMode = () => {
    const { darkMode, setDarkMode } = this.props;
    setDarkMode(!darkMode);
  };

  handleOpenMenu = (menuId) => (event) => {
    const { anchorEl } = this.state;
    event.preventDefault();
    this.setState({ anchorEl: { ...anchorEl, [menuId]: event.target } });
    return false;
  };

  handleCloseMenu = (menuId) => (event) => {
    const { anchorEl } = this.state;
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.setState({ anchorEl: { ...anchorEl, [menuId]: null } });
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
    const { mobile, setMobile, darkMode, menuItems, session, myAccountUrl, userMenu, handleOpen, handleClose, openProficiencies } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        {navigation.map(navLink => (
          <div key={navLink.name}>
            <Typography className="nav-item" onMouseOver={this.handleOpenMenu(navLink.name)}>
              <Link color="inherit" to={navLink.path} onClick={this.handleOpenMenu(navLink.name)}>
                {navLink.name}
              </Link>
            </Typography>
            <Menu
              anchorEl={anchorEl[navLink.name]}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={this.handleCloseMenu(navLink.name)}
              open={Boolean(anchorEl[navLink.name])}
              getContentAnchorEl={null}
              PaperProps={{
                onMouseLeave: this.handleCloseMenu(navLink.name),
              }}
              autoFocus={false}
            >
              <ListItem dense divider>
                <ListItemIcon><span className={cn('nav-icon', navLink.name)} /></ListItemIcon>
                <ListItemText
                  primary={
                    navLink.path
                      ? <Link to={navLink.path} variant="overline" color="inherit">{navLink.name}</Link>
                      : <Typography variant="overline">{navLink.name}</Typography>
                  }
                />
              </ListItem>
              {navLink.children.map(child => (
                <Link
                  color="inherit"
                  to={child.path}
                  onClick={this.handleCloseMenu(navLink.name)}
                  key={`${navLink.name}-${child.name}`}
                  underline="none"
                >
                  <MenuItem>
                    {child.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>
        ))}
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
        <IconButton
          onMouseOver={handleOpen}
          onClick={handleOpen}
          className="user-menu-icon"
          aria-controls="user-menu"
          aria-haspopup="true"
        >
          <Avatar src={session.avatarSrc} className={cn('avatar', { [session.avatarPlatform]: true })}>
            {!session.avatarSrc && <PersonIcon />}
          </Avatar>
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={userMenu}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(userMenu)}
          onClose={handleClose}
          PaperProps={{
            onMouseLeave: handleClose,
          }}
          autoFocus={false}
        >
          <ListItem dense divider>
            <ListItemAvatar>
              <Avatar src={session.avatarSrc} className={cn('avatar', 'nav-icon', { [session.avatarPlatform]: true })}>
                {!session.avatarSrc && <PersonIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="overline">{session.isAuthenticated ? session.username
              : 'Account'}</Typography>} />
          </ListItem>
          {menuItems}
          <MenuItem button onClick={openProficiencies}>Proficiencies</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleDarkMode}>
            {darkMode ? 'Light' : 'Dark'} Mode
            {darkMode ? <BrightnessHighIcon className="menu-icon-right" /> : <Brightness4Icon
              className="menu-icon-right" />}
          </MenuItem>
          {isMobileBrowser() &&
          <MenuItem onClick={() => {
            handleClose();
            setMobile(true);
          }}>
            Switch to Mobile <PhoneIphoneIcon className="menu-icon-right" />
          </MenuItem>}
        </Menu>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
