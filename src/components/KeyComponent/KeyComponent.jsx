import React, { Component } from 'react';
import { node } from 'react-proptypes';

class KeyComponent extends Component {
  static propTypes = {
    children: node.isRequired,
  };

  render() {
    return React.Children.only(this.props.children);
  }
}

export default KeyComponent;
