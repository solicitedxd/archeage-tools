import React, { Component } from 'react';
import {
  bool,
  node,
  number,
  string,
} from 'react-proptypes';
import { Typography } from '@material-ui/core';
import cn from 'classnames';
import { QUALITY } from 'constants/dailies';

class Item extends Component {
  static propTypes = {
    name: string.isRequired,
    icon: node.isRequired,
    type: string,
    description: node,
    quality: string,
    price: number,
    bindsOnPickup: bool,
    count: number,
    unidentified: bool,
  };

  static defaultProps = {
    type: '',
    description: <span>No description</span>,
    quality: QUALITY.BASIC,
    price: 0,
    bindsOnPickup: false,
    count: 1,
    unidentified: false,
  };

  render() {
    const { name, icon, quality, count, unidentified } = this.props;
    return (
      <div data-quality={quality}>
        <div className={cn('item-icon', { 'unidentified': unidentified })} data-item={true} data-item-name={name}>
          <img src={icon} alt={name} />
          <Typography className="count">{count}</Typography>
        </div>
      </div>
    );
  }
}

export default Item;
