import { Avatar as MuiAvatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { fetchUser } from 'actions/users';
import cn from 'classnames';
import {
  number,
  object,
  string,
} from 'prop-types';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Avatar extends Component {
  static propTypes = {
    user: string.isRequired,
    size: number,
    avatar: object,
  };

  static defaultProps = {
    size: 1,
  };

  componentDidMount() {
    const { user, avatar } = this.props;
    if (!avatar) {
      fetchUser(user);
    }
  }

  render() {
    const { size: em, avatar } = this.props;
    const size = `${em}em`;

    return (
      <MuiAvatar
        src={pathOr(null, ['src'])(avatar)}
        style={{ width: size, height: size }}
        className={cn('avatar', { [pathOr(null, ['platform'])(avatar)]: true })}
      >
        {!pathOr(null, ['src'])(avatar) && <PersonIcon />}
      </MuiAvatar>
    );
  }
}

const mapStateToProps = ({ users }, { user }) => ({
  ...users[user],
});

export default connect(mapStateToProps)(Avatar);
