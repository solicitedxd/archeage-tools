import {
  Fab,
  Zoom,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import React, { Component } from 'react';
import { scrollToTop } from 'utils/string';

class ScrollToTop extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    scrollY: 0,
    height: window.innerHeight,
  };

  handleWindowScroll = () => {
    this.setState({ scrollY: document.documentElement.scrollTop });
  };

  handleWindowResize = () => {
    this.setState({ height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleClick = () => {
    scrollToTop();
    history.pushState('', document.title, document.location.pathname);
  };

  render() {
    const { scrollY, height } = this.state;

    return (
      <Zoom in={scrollY >= height * 0.5} unmountOnExit>
        <Fab
          color="primary"
          className="fab"
          onClick={this.handleClick}
        >
          <ExpandLessIcon />
        </Fab>
      </Zoom>
    );
  }
}

export default ScrollToTop;
