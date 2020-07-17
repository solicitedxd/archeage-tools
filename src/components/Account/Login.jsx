import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  attemptLogin,
  closeWindow,
  fetchMe,
} from 'actions/session';
import React, { Component } from 'react';
import {
  bool,
  func,
} from 'react-proptypes';
import { connect } from 'react-redux';

class Login extends Component {
  static propTypes = {
    open: bool.isRequired,
    closeWindow: func.isRequired,
    attemptLogin: func.isRequired,
    fetchMe: func.isRequired,
  };

  static defaultProps = {};

  state = {
    formData: {
      username: '',
      password: '',
    },
    loading: false,
  };

  handleChange = (field) => (e) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: e.target.value } });
  };

  handleSubmit = (e) => {
    const { attemptLogin, fetchMe, closeWindow } = this.props;
    const { formData } = this.state;

    e.preventDefault();

    this.setState({ loading: true });

    // attempt login
    //  => go to home on success
    //  => do nothing on failure
    attemptLogin(formData)
    .then(() => {
      closeWindow();
      fetchMe();
    })
    .catch(() => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { open, closeWindow } = this.props;
    const { formData, loading } = this.state;

    return (
      <Dialog
        open={open}
        onClose={closeWindow}
        maxWidth="xl"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Login</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={closeWindow}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <FormControl component="fieldset" className="form-control">
              <TextField
                id="login-username"
                required
                label="Username"
                value={formData.username}
                onChange={this.handleChange('username')}
              />
              <TextField
                id="login-password"
                required
                label="Password"
                value={formData.password}
                onChange={this.handleChange('password')}
                type="password"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit"
                disabled={loading}
              >
                Login
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ session: { windows: { login } } }) => ({
  open: Boolean(login),
});

const mapDispatchToProps = {
  attemptLogin,
  closeWindow,
  fetchMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
