import React, { Component } from 'react';
import { object, string } from 'react-proptypes';
import { Link } from '@material-ui/core';
import Item from 'components/Item/Item';

class ItemLink extends Component {
  static propTypes = {
    item: object.isRequired,
    plural: string,
  };

  static defaultProps = {
    plural: '',
  };

  state = {};

  render() {
    const { item, plural } = this.props;

    return (
      <Link data-item={true} data-item-name={item.name} style={{ display: 'inline-block' }}>
        <Item {...item} className="inline" />
        {item.name}{plural}
      </Link>
    );
  }
}

export default ItemLink;
