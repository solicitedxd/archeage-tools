import React, { Component } from 'react';
import {
  number,
  object,
  string,
} from 'react-proptypes';
import { Link } from '@material-ui/core';
import Item from 'components/Item/Item';

class ItemLink extends Component {
  static propTypes = {
    item: object.isRequired,
    plural: string,
    count: number,
  };

  static defaultProps = {
    plural: null,
    count: 1,
  };

  state = {};

  render() {
    const { item, plural, count } = this.props;

    return (
      <Link data-item={true} data-item-name={item.name} style={{ display: 'inline-block' }}>
        <Item {...item} className="inline" />
        {count !== 1 ? `${count} ` : ''}{item.name}{count !== 1 || plural !== null ? (plural != null ? plural : 's') : ''}
      </Link>
    );
  }
}

export default ItemLink;
