import React, { Component } from 'react';
import {
  bool,
  node,
  number,
  string,
} from 'react-proptypes';
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
    className: string,
  };

  static defaultProps = {
    type: '',
    description: <span>No description</span>,
    quality: QUALITY.BASIC,
    price: 0,
    bindsOnPickup: false,
    count: 1,
    unidentified: false,
    className: '',
  };

  render() {
    const { name, icon, quality, count, unidentified, className } = this.props;
    return (
      <span data-quality={quality} className={className}>
        <span className={cn('item-icon', { 'unidentified': unidentified })} data-item={true} data-item-name={name}>
          <img src={icon} alt={name} />
          <span className="count">{count}</span>
        </span>
      </span>
    );
  }
}

export default Item;
