import React, { Component } from 'react';
import { string, bool, node, number } from 'react-proptypes';
import { QUALITY } from 'constants/dailies';
import { Typography } from '@material-ui/core';

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
  };

  static defaultProps = {
    type: '',
    description: <span>No description</span>,
    quality: QUALITY.BASIC,
    price: 0,
    bindsOnPickup: false,
    count: 1,
  };

  state = {};

  render() {
    const { name, icon, quality, count } = this.props;
    return (
      <div data-quality={quality}>
        <div className="item-icon" data-item={true} data-item-name={name} data-count={count}>
          <img src={icon} alt={name} />
          <Typography className="count">{count}</Typography>
        </div>
      </div>
    );
  }
}

export default Item;
