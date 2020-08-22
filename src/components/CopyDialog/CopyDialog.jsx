import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Close,
  FileCopy,
} from '@material-ui/icons';
import React, { Component } from 'react';
import {
  bool,
  func,
  string,
} from 'react-proptypes';

class CopyDialog extends Component {
  static propTypes = {
    open: bool.isRequired,
    handleClose: func.isRequired,
    title: string.isRequired,
    label: string.isRequired,
    value: string.isRequired,
  };

  state = {
    copied: false,
  };

  // reset copied when the dialog is opened
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.setState({ copied: false });
    }
  }

  handleCopy = () => {
    this.copyTextfield.children[0].select();
    document.execCommand('copy');
    this.setState({ copied: true });
  };

  render() {
    const { open, handleClose, title, label, value } = this.props;
    const { copied } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{title}</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            label={label}
            value={value}
            InputProps={{
              readOnly: true,
              ref: (node) => this.copyTextfield = node,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <FileCopy style={{ cursor: 'pointer' }} onClick={this.handleCopy} />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            fullWidth
            multiline
            helperText={copied ? <Typography color="primary" variant="body2" component="span">Copied!</Typography> : ''}
            style={{ width: 300 }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default CopyDialog;
