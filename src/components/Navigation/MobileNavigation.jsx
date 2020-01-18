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
import MenuIcon from '@material-ui/icons/Menu';
import WarningIcon from '@material-ui/icons/Warning';
import {
  setDarkMode,
  setMobile,
} from 'actions/display';
import cn from 'classnames';
import DiscordButton from 'components/DiscordButton';
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
import { injectPatreon } from 'utils/display';

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
  };

  static defaultProps = {
    mobile: false,
    darkMode: false,
    setDarkMode: () => {
    },
    setMobile: () => {
    },
  };

  state = {
    expanded: {},
  };

  toggleDarkMode = () => {
    const { darkMode, setDarkMode } = this.props;
    setDarkMode(!darkMode);
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
    const { expanded: { [menuId]: removed, ...expanded } } = this.state;
    this.setState({ expanded });
  };

  render() {
    const { mobile, setMobile, darkMode, menuItems, session, myAccountUrl, open, handleOpen, handleClose } = this.props;
    const { expanded } = this.state;

    if (pathOr(0, ['patreon', 'pledge'])(session) === 0 && mobile && open) {
      injectPatreon();
    }

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
              <ListItem button onClick={this.handleExpand(navLink.name)} key={navLink.name}>
                <ListItemIcon><span className={cn('nav-icon', navLink.name)} /></ListItemIcon>
                <ListItemText primary={navLink.name} />
                {expanded[navLink.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>,
              <Collapse in={expanded[navLink.name]} timeout="auto" unmountOnExit key={`collapse-${navLink.name}`}>
                <List component="div" disablePadding className="nested-list">
                  {navLink.children.map(child => (
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
                {session.avatarSrc ?
                  <Avatar
                    src={session.avatarSrc}
                    className={cn('avatar', 'nav-icon', { [session.avatarPlatform]: true })}
                  /> :
                  <span className="nav-icon Account" />}
              </ListItemIcon>
              <ListItemText primary={session.username || 'Account'} />
              {expanded['Account'] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={expanded['Account']} timeout="auto" unmountOnExit>
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
              {expanded['Settings'] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={expanded['Settings']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className="nested-list-icons">
                <ListItem button onClick={this.toggleDarkMode}>
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
              </List>
            </Collapse>
            <Divider />
            {pathOr(0, ['patreon', 'pledge'])(session) === 0 &&
            <ListItem>
              <div style={{ margin: 'auto' }}>
                {<a href="https://www.patreon.com/bePatron?u=12806740" target="_blank"
                    data-patreon-widget-type="become-patron-button">Become a Patron!</a>}
              </div>
            </ListItem>}
            <ListItem>
              <div style={{ margin: 'auto' }}>
                <DiscordButton />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);
