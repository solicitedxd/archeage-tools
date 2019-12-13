import React, { Component } from 'react';
import {
  func,
  node,
  oneOf,
  string,
} from 'react-proptypes';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';
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
    const { to } = this.props;
    const { pathname } = document.location;
    const exp = /^\/guides/;

    if ((to && to.match(exp) && !pathname.match(exp))
      || (to && to.match(exp) && pathname.match(exp) && !to.match(/#[\w -]+/))) {
      scrollToTop();
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const { children, ...other } = this.props;
    return (
      <MuiLink
        {...other}
        component={RouterLink}
        onClick={this.handleClick}
      >
        {children}
      </MuiLink>
    );
  }
}

export default Link;
