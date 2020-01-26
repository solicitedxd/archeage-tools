import { Link as MuiLink } from '@material-ui/core';
import React, { Component } from 'react';
import {
  func,
  node,
  oneOf,
  string,
} from 'react-proptypes';
import { Link as RouterLink } from 'react-router-dom';
import { scrollToTop } from 'utils/string';

class Link extends Component {
  static propTypes = {
    to: string,
    onClick: func,
    color: oneOf(['primary', 'secondary', 'initial', 'textPrimary', 'textSecondary', 'error', 'inherit']),
    children: node.isRequired,
  };

  static defaultProps = {
    to: null,
    onClick: null,
    color: 'primary',
  };

  // scroll to top for guide links
  handleClick = (e) => {
    const { to, onClick } = this.props;

    if (to && !to.match(/#[\w -]+/)) {
      scrollToTop();
    }
    if (onClick) {
      onClick(e);
    }
  };

  render() {
    const { children, ...other } = this.props;
    return (
      <MuiLink
        {...other}
        component={other.to ? RouterLink : null}
        onClick={this.handleClick}
      >
        {children}
      </MuiLink>
    );
  }
}

export default Link;
