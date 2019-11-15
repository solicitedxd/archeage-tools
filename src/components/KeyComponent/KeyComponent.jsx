import React, { Component } from 'react';

class KeyComponent extends Component {
  render() {
    return React.Children.only(this.props.children);
  }
}

export default KeyComponent;
