import { Typography } from '@material-ui/core';
import cn from 'classnames';
import React, { Component } from 'react';
import { string } from 'react-proptypes';
import { Link } from 'react-router-dom';
import { getNavId } from 'utils/string';

class Banner extends Component {
  static propTypes = {
    name: string.isRequired,
    info: string.isRequired,
    path: string.isRequired,
  };

  render() {
    const { name, info, path } = this.props;
    const bannerClass = getNavId(path);

    return (
      <Link to={path}>
        <div className="home-banner">
          <div className={cn('banner-icon', bannerClass)} />
          <div className="banner-text">
            <Typography className="banner-name">{name}</Typography>
            <Typography className="banner-info" variant="subtitle1">{info}</Typography>
          </div>
        </div>
      </Link>
    );
  }
}

export default Banner;
