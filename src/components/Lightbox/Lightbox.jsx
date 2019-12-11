import React, { Component } from 'react';
import {
  number,
  oneOf,
  string,
} from 'react-proptypes';
import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Zoom,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import cn from 'classnames';

class Lightbox extends Component {
  static propTypes = {
    image: string.isRequired,
    title: string.isRequired,
    caption: string,
    elevation: number,
    float: oneOf(['left', 'right']),
  };

  static defaultProps = {
    caption: '',
    elevation: 1,
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { image, title, caption, elevation, float } = this.props;
    const { open } = this.state;

    return [
      <Paper
        className={cn('lightbox-thumb', { float })}
        elevation={elevation}
      >
        <img src={image} alt={title} onClick={this.handleOpen} />
        <Typography variant="caption">{title}</Typography>
      </Paper>,
      <Dialog
        open={open}
        onClose={this.handleClose}
        maxWidth="xl"
        TransitionComponent={Zoom}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{title}</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={this.handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <img src={image} alt={title} />
          <Typography>{caption}</Typography>
        </DialogContent>
      </Dialog>,
    ];
  }
}

export default Lightbox;
