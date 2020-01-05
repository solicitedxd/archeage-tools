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
import CloseIcon from '@material-ui/icons/Close';
import cn from 'classnames';
import NoImage from 'images/guides/NoImage.png';
import React, { Component } from 'react';
import {
  number,
  oneOf,
  string,
} from 'react-proptypes';

class Lightbox extends Component {
  static propTypes = {
    image: string,
    title: string.isRequired,
    caption: string,
    elevation: number,
    float: oneOf(['left', 'right']),
  };

  static defaultProps = {
    caption: '',
    elevation: 1,
    noImage: false,
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    if (!this.props.image) return;
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { image, title, caption, elevation, float } = this.props;
    const { open } = this.state;

    return (
      <>
        <Paper
          className={cn('lightbox-thumb', { [float]: Boolean(float) })}
          elevation={elevation}
        >
          <img src={image || NoImage} alt={title} onClick={this.handleOpen} />
          <Typography variant="caption">{title}</Typography>
        </Paper>
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
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <img src={image} alt={title} />
            <Typography>{caption}</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default Lightbox;
