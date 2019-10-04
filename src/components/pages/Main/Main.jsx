import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  AppBar,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
  pink,
  teal,
} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
// import Settings from 'components/Settings';
import Favicon from 'images/favicon.ico';
import { clearNotification } from 'actions/notification';
import 'styles/index';

let theme = createMuiTheme({
  palette: {
    primary: teal,
    accent: pink,
  },
});
theme = responsiveFontSizes(theme);

class Main extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
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
          <AppBar position="static" id="title-bar">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu" id="logo-icon-wrapper">
                <Link id="logo-icon" to="/" />
              </IconButton>
              <Typography variant="overline" color="inherit" className="title-text">
                ArcheAge Tools
              </Typography>
              {/*{isAuthenticated && (*/}
              {/*  <Settings badgeCount={badgeCount} />*/}
              {/*)}*/}
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
