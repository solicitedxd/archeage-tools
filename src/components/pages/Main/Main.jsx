import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  AppBar,
  IconButton,
  Link as MuiLink,
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
  pink,
  teal,
} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import Favicon from 'images/favicon.ico';
import { clearNotification } from 'actions/notification';
import ItemTooltip from 'components/Item/ItemTooltip';
import 'styles/index';

const palette = createPalette({
  primary: teal,
  accent: pink,
});

let theme = createMuiTheme({
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
  },
});
theme = responsiveFontSizes(theme);

class Main extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      notification,
      clearNotification,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <link rel="shortcut icon" href={Favicon} />
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Menu" id="logo-icon-wrapper" className="icon-button">
                <Link id="logo-icon" to="/" />
              </IconButton>
              <Typography variant="h6" color="inherit" className="title-text">
                ArcheAge Tools
              </Typography>
              <Typography className="nav-item">
                <MuiLink component={Link} to="/dailies" color="inherit">
                  Daily Quests
                </MuiLink>
              </Typography>
              <Typography className="nav-item">
                <MuiLink component={Link} to="/skills" color="inherit">
                  Skill Calculator
                </MuiLink>
              </Typography>
              <Typography className="nav-item">
                <MuiLink component={Link} to="/tradepacks" color="inherit">
                  Trade Pack Calculator
                </MuiLink>
              </Typography>
            </Toolbar>
          </AppBar>
          {children}
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
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <ItemTooltip />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ notification }) => ({
  notification,
});

const mapDispatchToProps = {
  clearNotification,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
