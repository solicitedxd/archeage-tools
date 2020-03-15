import { Typography } from '@material-ui/core';
import { fetchUser } from 'actions/users';
import cn from 'classnames';
import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Username extends Component {
  static propTypes = {
    user: string.isRequired,
    username: string,
    userTag: string,
    variant: string,
    component: string,
  };

  static defaultProps = {
    username: null,
    userTag: null,
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
    const { username, variant, component, userTag } = this.props;

    return (
      <Typography
        variant={variant}
        component={component}
        color="primary"
        className={cn({ [userTag && `role-${userTag.toLowerCase()}`]: Boolean(userTag) })}
      >
        {userTag && `[${userTag}] `}
        {username}
      </Typography>
    );
  }
}

const mapStateToProps = ({ users }, { user }) => ({
  ...users[user],
});

export default connect(mapStateToProps)(Username);
