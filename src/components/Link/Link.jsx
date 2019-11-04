import React, { Component } from 'react';
import {
  func,
  node,
  oneOf,
  string,
} from 'react-proptypes';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';

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

  render() {
    const { children, ...other } = this.props;
    return (
      <MuiLink
        {...other}
        component={RouterLink}
      >
        {children}
      </MuiLink>
    );
  }
}

export default Link;
