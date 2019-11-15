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
      <Link
        data-item={true}
        data-item-name={item.name}
        className="inline-link"
        style={style}
      >
        <Item {...item} className="inline" />
        {count !== 1 ? `${count} ` : ''}{item.name}{count !== 1 || plural !== null ? (plural != null ? plural : 's') : ''}
      </Link>
    );
  }
}

export default ItemLink;
