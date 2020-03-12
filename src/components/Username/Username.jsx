import { Typography } from '@material-ui/core';
import { fetchUser } from 'actions/users';
import cn from 'classnames';
import {
  array,
  string,
} from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';

class Username extends Component {
  static propTypes = {
    user: string.isRequired,
    username: string,
    roles: array,
    variant: string,
    component: string,
  };

  static defaultProps = {
    username: null,
    roles: null,
    variant: 'body2',
    component: 'span',
  };

  componentDidMount() {
    const { user, username, roles } = this.props;

    if (!username && !roles) {
      fetchUser(user);
    }
  }

  render() {
    const { username, variant, component, roles } = this.props;
    const tagRole = roles && roles.sort(sortBy('id')).find(r => r.showTag && r.tag);

    return (
      <Typography
        variant={variant}
        component={component}
        color="primary"
        className={cn({ [tagRole && `role-${tagRole.tag.toLowerCase()}`]: Boolean(tagRole) })}
      >
        {tagRole && `[${tagRole.tag}] `}
        {username}
      </Typography>
    );
  }
}

const mapStateToProps = ({ users }, { user }) => ({
  ...users[user],
});

export default connect(mapStateToProps)(Username);
