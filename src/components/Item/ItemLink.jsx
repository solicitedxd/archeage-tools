import React, { Component } from 'react';
import {
  number,
  object,
  string,
} from 'react-proptypes';
import { Link } from '@material-ui/core';
import Item from 'components/Item/Item';
import ItemTooltip from 'components/Item/ItemTooltip';

class ItemLink extends Component {
  static propTypes = {
    item: object.isRequired,
    plural: string,
    count: number,
    style: object,
  };

  static defaultProps = {
    plural: null,
    count: 1,
    style: {},
  };

  state = {};

  render() {
    const { item, plural, count, style } = this.props;

    return (
      <ItemTooltip itemName={item.name}>
        <Link className="inline-link" style={style}>
          <Item {...item} className="inline" tooltipDisabled />
          {count !== 1 ? `${count} ` : ''}{item.name}{count !== 1 || plural !== null ? (plural != null ? plural : 's')
          : ''}
        </Link>
      </ItemTooltip>
    );
  }
}

export default ItemLink;
