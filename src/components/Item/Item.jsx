import cn from 'classnames';
import ItemTooltip from 'components/Item/ItemTooltip';
import { QUALITY } from 'constants/items';
import React, { Component } from 'react';
import {
  bool,
  node,
  number,
  string,
} from 'react-proptypes';

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
    questStarter: bool,
    className: string,
    tooltipDisabled: bool,
  };

  static defaultProps = {
    type: '',
    description: <span>No description</span>,
    quality: QUALITY.BASIC,
    price: 0,
    bindsOnPickup: false,
    count: 1,
    unidentified: false,
    questStarter: false,
    className: '',
    tooltipDisabled: false,
  };

  render() {
    const { name, icon, quality, count, unidentified, questStarter, className, tooltipDisabled } = this.props;
    return (
      <ItemTooltip itemName={name} disabled={tooltipDisabled}>
        <span data-quality={quality} className={className}>
          <span className={cn('item-icon', { 'unidentified': unidentified, 'quest': questStarter })}>
            <img src={icon} alt={name} />
            <span className="count">{count}</span>
          </span>
        </span>
      </ItemTooltip>
    );
  }
}

export default Item;
