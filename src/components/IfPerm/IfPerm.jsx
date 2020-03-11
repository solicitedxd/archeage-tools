import { hasPermission } from 'actions/session';
import {
  array,
  node,
  oneOfType,
  string,
} from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class IfPerm extends Component {
  static propTypes = {
    children: oneOfType([array, node]).isRequired,
    permission: string.isRequired,
  };

  render() {
    const { hasPermission, permission, children } = this.props;

    if (hasPermission(permission)) {
      return children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  hasPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(IfPerm);
