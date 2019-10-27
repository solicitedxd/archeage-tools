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
    path: string,
    text: string.isRequired,
    disabled: bool,
    noBanner: bool,
  };

  static defaultProps = {
    path: '',
    disabled: false,
    noBanner: false,
  };

  render() {
    const { path, disabled, text, noBanner } = this.props;
    const bannerClass = getNavId(path);

    if (noBanner) {
      return null;
    }

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
