import {
  Link,
  MenuItem,
} from '@material-ui/core';
import {
  displayLogin,
  displayRegister,
  logout,
} from 'actions/session';
import Login from 'components/Account/Login';
import Register from 'components/Account/Register';
import config from 'config';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const myAccountUrl = `http://${config.dev ? 'dev' : 'www'}.mokulu.io/my-account`;

class Navigation extends Component {
  static propTypes = {
    logout: func.isRequired,
    displayLogin: func.isRequired,
    displayRegister: func.isRequired,
    session: object,
    mobile: bool,
  };

  state = {
    userEl: null,
  };

  handleNavigate = (action) => () => {
    this.handleClose();
    switch (action) {
      case 'logout':
        this.props.logout();
        break;
      case 'login':
        this.props.displayLogin(true);
        break;
      case 'register':
        this.props.displayRegister(true);
        break;
      default:
      // do nothing
    }
  };

  handleClose = () => {
    this.setState({ userEl: null });
  };

  handleOpen = (e) => {
    this.setState({ userEl: e.target });
  };

  render() {
    const { session, mobile } = this.props;
    const { userEl } = this.state;

    const menuItems = [];

    session.isAuthenticated = Boolean(session.access_token);
    if (session.isAuthenticated) {
      menuItems.push(
        <Link href={myAccountUrl} color="inherit" underline="none" key="my-acc"><MenuItem>My Account</MenuItem></Link>,
      );
      menuItems.push(<MenuItem onClick={this.handleNavigate('logout')} key="logout">Logout</MenuItem>);
    } else {
      menuItems.push(<MenuItem onClick={this.handleNavigate('login')} key="login">Login</MenuItem>);
      menuItems.push(<MenuItem onClick={this.handleNavigate('register')} key="create">Create Account</MenuItem>);
      session.avatar = null;
      session.discord = null;
    }

    const discordAvatar = pathOr(null, ['discord', 'avatar'])(session);
    const defaultAvatar = discordAvatar;
    switch (session.avatar) {
      case 0:
        session.avatarSrc = discordAvatar;
        break;
      default:
        session.avatarSrc = defaultAvatar;
    }
    if (!session.avatarSrc) {
      session.avatarSrc = defaultAvatar;
    }
    switch (session.avatarSrc) {
      case null:
        session.avatarPlatform = null;
        break;
      case discordAvatar:
        session.avatarPlatform = 'discord';
        break;
      default:
        session.avatarPlatform = null;
    }

    return (
      <>
        {!mobile &&
        <DesktopNavigation
          menuItems={menuItems}
          session={session}
          myAccountUrl={myAccountUrl}
          userMenu={userEl}
        />}
        <MobileNavigation
          menuItems={menuItems}
          session={session}
          myAccountUrl={myAccountUrl}
          open={Boolean(userEl)}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        />

        {!session.isAuthenticated &&
        <>
          <Login />
          <Register />
        </>}
      </>
    );
  }
}

const mapStateToProps = ({ session, display: { mobile } }) => ({
  session,
  mobile,
});

const mapDispatchToProps = {
  displayRegister,
  displayLogin,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
