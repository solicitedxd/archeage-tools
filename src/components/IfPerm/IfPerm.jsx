import { hasPermission } from 'actions/session';
import { Component } from 'react';
import {
  array,
  func,
  node,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { eqIgnoreCase } from 'utils/string';

class IfPerm extends Component {
  static propTypes = {
    children: oneOfType([array, node]).isRequired,
    permission: string.isRequired,
    orUserIs: string,
    hasPermission: func.isRequired,
    username: string,
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
