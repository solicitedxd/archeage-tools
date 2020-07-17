import { Typography } from '@material-ui/core';
import { fetchUser } from 'actions/users';
import cn from 'classnames';
import React, { Component } from 'react';
import { string } from 'react-proptypes';
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
    const { user, username } = this.props;

    if (!username) {
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
