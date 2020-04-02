import { Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import {
  any,
  node,
} from 'react-proptypes';

class OptionalTooltip extends Component {
  static propTypes = {
    title: any,
    children: node.isRequired,
  };

  static defaultProps = {
    title: null,
  };

  state = {};

  render() {
    const { title, children } = this.props;
    if (title) {
      return (
        <Tooltip title={title}>{children}</Tooltip>
      );
    }
    return children;
  }
}

export default OptionalTooltip;
