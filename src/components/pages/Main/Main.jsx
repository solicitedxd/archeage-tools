import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';
import { ThemeProvider } from '@material-ui/styles';
import {
  blueGrey,
  teal,
} from '@material-ui/core/colors';
import {
  Brightness4,
  BrightnessHigh,
  Close,
  Menu,
} from '@material-ui/icons';
import cn from 'classnames';
import {
  setDarkMode,
  setMobile,
} from 'actions/display';
import { clearNotification } from 'actions/notification';
import ItemTooltip from 'components/Item/ItemTooltip';
import SkillTooltip from 'components/Skill/SkillTooltip';
import navigation from 'constants/navigation';
import { getNavId } from 'utils/string';
import 'styles/index';

class Main extends React.PureComponent {
  state = {
    drawerOpen: false,
  };

  createPalette = () => {
    const { darkMode } = this.props;

    const palette = createPalette({
      type: darkMode ? 'dark' : 'light',
      primary: teal,
      secondary: blueGrey,
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
        MuiDialogTitle: {
          root: {
            padding: 0,
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

  render() {
    const {
      children,
      notification,
      clearNotification,
      mobile,
      darkMode,
    } = this.props;
    const { drawerOpen } = this.state;

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
                <Link id="logo-icon" to="/" />
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
                return (
                  <Typography className="nav-item" key={navLink.path}>
                    <MuiLink component={Link} to={navLink.path} color="inherit">
                      {navLink.short || navLink.name}
                    </MuiLink>
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
                      <Link to={navLink.path} className="no-link" onClick={this.handleClose} key={navLink.path}>
                        <ListItem button>
                          <ListItemIcon><span className={cn('nav-icon', getNavId(navLink.path))} /></ListItemIcon>
                          <ListItemText primary={navLink.name} />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </Drawer>
            </Toolbar>
          </AppBar>
          {children}
          <div className="section" style={{ marginTop: 0 }}>
            <div className="footer">
              <Typography variant="caption">ArcheAge Tools v{__VERSION__}</Typography>
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
          <ItemTooltip />
          <SkillTooltip />
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
