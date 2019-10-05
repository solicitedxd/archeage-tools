import React, { Component } from 'react';
import {
  bool,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getNavId } from 'utils/string';

class Banner extends Component {
  static propTypes = {
    path: string.isRequired,
    text: string.isRequired,
    disabled: bool,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { path, disabled, text } = this.props;
    const bannerClass = getNavId(path);

    const banner = (
      <div className={cn('home-banner', bannerClass, { 'disabled': disabled })}>
        <Typography className="banner-text">{text}</Typography>
      </div>
    );

    if (disabled) {
      return banner;
    }

    return (
      <Link to={path}>
        {banner}
      </Link>
    );
  }
}

export default Banner;
