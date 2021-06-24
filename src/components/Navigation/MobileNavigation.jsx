import {
  Avatar,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from '@material-ui/icons/Menu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import WarningIcon from '@material-ui/icons/Warning';
import {
  openDialog,
  setDarkMode,
  setHideAds,
  setMobile,
} from 'actions/display';
import { push } from 'actions/navigate';
import cn from 'classnames';
import DiscordButton from 'components/DiscordButton';
import DonateButton from 'components/DonateButton';
import Link from 'components/Link';
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

class MobileNavigation extends Component {
  static propTypes = {
    mobile: bool,
    setMobile: func,
    darkMode: bool,
    setDarkMode: func,
    session: object.isRequired,
    menuItems: array.isRequired,
    open: bool.isRequired,
    handleOpen: func.isRequired,
    handleClose: func.isRequired,
    myAccountUrl: string,
    openDialog: func.isRequired,
    setHideAds: func.isRequired,
    hideAds: bool,
  };

  static defaultProps = {
    mobile: false,
    darkMode: false,
  };

  state = {
    expanded: {},
  };

  handleExpand = (menuId) => () => {
    const { expanded } = this.state;
    if (expanded[menuId]) {
      this.handleCollapse(menuId)();
    } else {
      this.setState({ expanded: { ...expanded, [menuId]: true } });
    }
  };

  handleCollapse = (menuId) => () => {
    // eslint-disable-next-line no-unused-vars
    const { expanded: { [menuId]: removed, ...expanded } } = this.state;
    this.setState({ expanded });
  };

  render() {
    const {
      mobile,
      setMobile,
      darkMode,
      setDarkMode,
      menuItems,
      session,
      myAccountUrl,
      open,
      handleOpen,
      handleClose,
      openDialog,
      hideAds,
      setHideAds,
    } = this.props;
    const { expanded } = this.state;

    return (
      <>
        {mobile &&
        <IconButton color="inherit" aria-label="Open Drawer" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>}
        <Drawer anchor="right" open={mobile && open} onClose={handleClose}>
          <List
            style={{ width: 250 }}
            subheader={<ListSubheader component={Paper}>ArcheAge Tools</ListSubheader>}
          >
            {navigation.map(navLink => [
              <ListItem
                button
                onClick={navLink.children ? this.handleExpand(navLink.name) : () => push(navLink.path)}
                key={navLink.name}
              >
                <ListItemIcon><span className={cn('nav-icon', navLink.name)} /></ListItemIcon>
                <ListItemText primary={navLink.name} />
                {navLink.children && (expanded[navLink.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItem>,
              <Collapse in={expanded[navLink.name]} timeout="auto" unmountOnExit key={`collapse-${navLink.name}`}>
                <List component="div" disablePadding className="nested-list">
                  {navLink.path && navLink.mobileName &&
                  <Link
                    to={navLink.path}
                    color="inherit"
                    onClick={handleClose}
                    underline="none"
                  >
                    <ListItem button>
                      <ListItemText primary={navLink.mobileName} />
                    </ListItem>
                  </Link>}
                  {navLink.children && navLink.children.map(child => (
                    <Link
                      to={child.path}
                      color="inherit"
                      key={`${navLink.name}-${child.name}`}
                      onClick={handleClose}
                      underline="none"
                    >
                      <ListItem button>
                        <ListItemText primary={child.name} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>,
            ])}
            <Divider />
            <ListItem button onClick={this.handleExpand('Account')}>
              <ListItemIcon>
                {session.avatarSrc
                  ? <Avatar
                    src={session.avatarSrc}
                    className={cn('avatar', 'nav-icon', { [session.avatarPlatform]: true })}
                  />
                  : <span className="nav-icon Account" />}
              </ListItemIcon>
              <ListItemText primary={session.username || 'Account'} />
              {expanded.Account ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={expanded.Account} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className="nested-list">
                {session.isAuthenticated && !session.verified &&
                <MuiLink href={myAccountUrl} color="inherit" underline="none" onClick={handleClose}>
                  <ListItem button className="nested-icon">
                    <ListItemIcon><WarningIcon className="verify-warn" /></ListItemIcon>
                    <ListItemText primary="E-mail is not verified." />
                  </ListItem>
                </MuiLink>}
                {menuItems}
              </List>
            </Collapse>
            <ListItem button onClick={this.handleExpand('Settings')}>
              <ListItemIcon><span className="nav-icon Settings" /></ListItemIcon>
              <ListItemText primary="Settings" />
              {expanded.Settings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={expanded.Settings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className="nested-list-icons">
                <ListItem button onClick={() => openDialog(DIALOG_MY_GAME)}>
                  <ListItemIcon><ListAltIcon /></ListItemIcon>
                  <ListItemText primary="My ArcheAge" />
                </ListItem>
                <ListItem button onClick={() => setDarkMode(!darkMode)}>
                  <ListItemIcon>{darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}</ListItemIcon>
                  <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button onClick={() => {
                  setMobile(false);
                  handleClose();
                }}>
                  <ListItemIcon><DesktopWindowsIcon /></ListItemIcon>
                  <ListItemText primary="Switch to Desktop" />
                </ListItem>
                <ListItem button onClick={() => setHideAds(!hideAds)}>
                  <ListItemIcon>{hideAds ? <VisibilityIcon /> : <VisibilityOffIcon />}</ListItemIcon>
                  <ListItemText primary={hideAds ? 'Show Ads' : 'Hide Ads'} />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
            <ListItem>
              <div style={{ margin: 'auto' }}>
                <DiscordButton />
              </div>
            </ListItem>
            <ListItem>
              <div style={{ margin: 'auto' }}>
                <DonateButton />
              </div>
            </ListItem>
          </List>
        </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);
