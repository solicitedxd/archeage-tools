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
import { setNotification } from 'actions/notification';
import {
  closeWindow,
  createAccount,
  displayLogin,
} from 'actions/session';
import { NOTIFICATION_TYPE } from 'constants/notification';
import React, { Component } from 'react';
import {
  bool,
  func,
} from 'react-proptypes';
import { connect } from 'react-redux';

class Register extends Component {
  static propTypes = {
    createAccount: func.isRequired,
    closeWindow: func.isRequired,
    displayLogin: func.isRequired,
    setNotification: func.isRequired,
    open: bool.isRequired,
  };

  static defaultProps = {};

  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
    loading: false,
  };

  handleChange = (field) => (e) => {
    const { formData } = this.state;
    let { value } = e.target;
    // email regex doesn't accept capital letters
    if (field === 'email') {
      value = value.toLowerCase();
    }
    this.setState({ formData: { ...formData, [field]: value } });
  };

  handleSubmit = (e) => {
    const { createAccount, closeWindow, displayLogin, setNotification } = this.props;
    const { formData } = this.state;

    e.preventDefault();

    this.setState({ loading: true, errors: {} });

    // attempt login
    //  => go to home on success
    //  => do nothing on failure
    createAccount(formData)
    .then((data) => {
      setNotification(`Welcome, ${data.username}. Your account has been created.`, NOTIFICATION_TYPE.SUCCESS);
      closeWindow();
      displayLogin(true);
    })
    .catch(errs => {
      const errors = {};
      errs.forEach(err => {
        errors[err.field] = err.defaultMessage;
      });
      this.setState({ errors, loading: false });
    });
  };

  render() {
    const { open, closeWindow } = this.props;
    const { formData, loading, errors } = this.state;

    return (
      <Dialog
        open={open}
        onClose={closeWindow}
        maxWidth="xl"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Create Account</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={closeWindow}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <FormControl component="fieldset" className="form-control">
              <TextField
                id="create-email"
                required
                label="E-mail Address"
                value={formData.email}
                onChange={this.handleChange('email')}
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                id="create-username"
                required
                label="Username"
                value={formData.username}
                onChange={this.handleChange('username')}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
              <TextField
                id="create-password"
                required
                label="Password"
                value={formData.password}
                onChange={this.handleChange('password')}
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <TextField
                id="confirm-password"
                required
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                type="password"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit"
                disabled={loading}
              >
                Create
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ session: { windows: { register } } }) => ({
  open: Boolean(register),
});

const mapDispatchToProps = {
  createAccount,
  closeWindow,
  displayLogin,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
