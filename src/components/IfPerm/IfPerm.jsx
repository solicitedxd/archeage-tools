import { hasPermission } from 'actions/session';
import {
  array,
  node,
  oneOfType,
  string,
} from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { eqIgnoreCase } from 'utils/string';

class IfPerm extends Component {
  static propTypes = {
    children: oneOfType([array, node]).isRequired,
    permission: string.isRequired,
    orUserIs: string,
  };

  static defaultProps = {
    orUserIs: null,
  };

  render() {
    const { hasPermission, permission, children, orUserIs, username } = this.props;
    const orUser = orUserIs ? eqIgnoreCase(username, orUserIs) : false;

    if (hasPermission(permission) || orUser) {
      return children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ session: { username } }) => ({
  username,
});

const mapDispatchToProps = {
  hasPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(IfPerm);
