import {
  AppBar,
  Drawer,
  Icon,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';
import {
  Brightness4,
  BrightnessHigh,
  Close,
  Menu,
} from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import {
  setDarkMode,
  setMobile,
} from 'actions/display';
import { clearNotification } from 'actions/notification';
import cn from 'classnames';
import CascadingMenu from 'components/CascadingMenu';
import Link from 'components/Link';
import navigation from 'constants/navigation';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import 'styles/index';
import { getNavId } from 'utils/string';

class Main extends React.PureComponent {
  state = {
    drawerOpen: false,
    anchorEl: {},
  };

  createPalette = () => {
    const { darkMode } = this.props;

    const palette = createPalette({
      type: darkMode ? 'dark' : 'light',
      primary: teal,
      secondary: {
        main: darkMode ? teal['50'] : teal['900'],
      },
    });

    const theme = createMuiTheme({
      palette: palette,
      typography: createTypography(palette, {
        fontFamily: '"Flareserif821BT-Roman"',
      }),
      overrides: {
        MuiCardHeader: {
          root: {
            padding: 8,
          },
          avatar: {
            marginRight: 8,
          },
        },
        MuiListItemIcon: {
          root: {
            minWidth: 24,
            textAlign: 'center',
          },
        },
        MuiExpansionPanelDetails: {
          root: {
            display: 'block',
            padding: '4px 12px 12px',
          },
        },
        MuiTooltip: {
          tooltip: {
            fontSize: '0.8rem',
          },
        },
      },
    });

    return responsiveFontSizes(theme);
  };

  handleWindowResize = () => {
    const { mobile, setMobile } = this.props;
    const shouldMobile = window.innerWidth < 640;

    if (mobile !== shouldMobile) {
      setMobile(shouldMobile);
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDarkMode = () => {
    const { darkMode, setDarkMode } = this.props;
    setDarkMode(!darkMode);
  };

  handleOpenMenu = (menuId) => (event) => {
    const { anchorEl } = this.state;
    this.setState({ anchorEl: { ...anchorEl, [menuId]: event.currentTarget } });
  };

  handleCloseMenu = (menuId) => {
    const { anchorEl } = this.state;
    this.setState({ anchorEl: { ...anchorEl, [menuId]: null } });
  };

  createMenuItems = (menuItems) => {
    return menuItems.filter((item) => !item.disabled).map((item, key) => {
      const menuItem = {
        key,
        caption: item.name,
      };
      if (item.children) {
        menuItem.subMenuItems = this.createMenuItems(item.children);
        menuItem.onClick = () => {
        };
      } else {
        menuItem.onClick = () => {
          this.props.history.push(item.path);
        };
      }
      return menuItem;
    });
  };

  render() {
    const {
      children,
      notification,
      clearNotification,
      mobile,
      darkMode,
    } = this.props;
    const { drawerOpen, anchorEl } = this.state;

    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    return (
      <ThemeProvider theme={this.createPalette()}>
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Menu" id="logo-icon-wrapper" className="icon-button">
                <RouterLink id="logo-icon" to="/" />
              </IconButton>
              <Typography variant="h6" color="inherit" className="title-text">
                ArcheAge Tools
              </Typography>
              {!mobile && navigation.map(navLink => {
                if (navLink.disabled) return null;
                if (navLink.darkMode) {
                  return (
                    <IconButton onClick={this.handleDarkMode} key="dark-mode">
                      {darkMode ? <BrightnessHigh /> : <Brightness4 style={{ color: 'white' }} />}
                    </IconButton>
                  );
                }

                if (navLink.children) {
                  return [
                    <Typography className="nav-item" key={navLink.path}>
                      <MuiLink color="inherit" onClick={this.handleOpenMenu(navLink.path)}>
                        {navLink.short || navLink.name}
                      </MuiLink>
                    </Typography>,
                    <CascadingMenu
                      key={`menu-${navLink.path}`}
                      anchorElement={anchorEl[navLink.path]}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      menuItems={this.createMenuItems(navLink.children)}
                      onClose={() => this.handleCloseMenu(navLink.path)}
                      open={Boolean(anchorEl[navLink.path])}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      getContentAnchorEl={null}
                    />,
                  ];
                }

                return (
                  <Typography className="nav-item" key={navLink.path}>
                    <Link to={navLink.path} color="inherit">
                      {navLink.short || navLink.name}
                    </Link>
                  </Typography>
                );
              })}
              {mobile &&
              <IconButton color="inherit" aria-label="Open Drawer" onClick={this.handleOpen}>
                <Menu />
              </IconButton>}
              <Drawer anchor="right" open={mobile && drawerOpen} onClose={this.handleClose}>
                <List style={{ width: 250 }}>
                  {navigation.map(navLink => {
                    if (navLink.disabled) return null;
                    if (navLink.darkMode) {
                      return (
                        <div
                          className="no-link"
                          onClick={() => {
                            this.handleClose();
                            this.handleDarkMode();
                          }}
                          key="dark-mode"
                        >
                          <ListItem button>
                            <ListItemIcon color="inherit" className="nav-icon">
                              <Icon style={{ fontSize: 32 }}>
                                {darkMode ? <BrightnessHigh /> : <Brightness4 />}
                              </Icon>
                            </ListItemIcon>
                            <ListItemText primary={navLink.name} />
                          </ListItem>
                        </div>
                      );
                    }
                    return (
                      <RouterLink to={navLink.path} className="no-link" onClick={this.handleClose} key={navLink.path}>
                        <ListItem button>
                          <ListItemIcon><span className={cn('nav-icon', getNavId(navLink.path))} /></ListItemIcon>
                          <ListItemText primary={navLink.name} />
                        </ListItem>
                      </RouterLink>
                    );
                  })}
                </List>
              </Drawer>
            </Toolbar>
          </AppBar>
          {children}
          <div className="section footer-wrapper">
            <div className="footer">
              <Typography variant="caption" className="title-text">ArcheAge Tools v{__VERSION__}</Typography>
              <iframe
                src="https://www.patreon.com/platform/iframe?widget=become-patron-button&amp;redirectURI=https%3A%2F%2Farcheage.mokulu.io%2F&amp;creatorID=12806740&amp;openInNewTab=true"
                scrolling="no" allowtransparency="true" frameBorder="0" className="patreon-widget"
                title="Patreon Widget"
                style={{ position: 'static', visibility: 'visible', width: 176, height: 33 }} />
            </div>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={notification.open}
            autoHideDuration={notification.duration}
            onClose={clearNotification}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{notification.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className="notification-close"
                onClick={clearNotification}
              >
                <Close />
              </IconButton>,
            ]}
          />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ notification, display: { mobile, darkMode } }) => ({
  notification,
  mobile,
  darkMode,
});

const mapDispatchToProps = {
  clearNotification,
  setMobile,
  setDarkMode,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
