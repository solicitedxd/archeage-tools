import React, { Component } from 'react';
import {
  bool,
  number,
  object,
  string,
} from 'react-proptypes';
import {
  Link,
  Typography,
} from '@material-ui/core';
import Item from 'components/Item/Item';
import ItemTooltip from 'components/Item/ItemTooltip';

class ItemLink extends Component {
  static propTypes = {
    item: object.isRequired,
    plural: string,
    count: number,
    style: object,
    noLink: bool,
  };

  static defaultProps = {
    plural: null,
    count: 1,
    style: {},
    noLink: false,
  };

  state = {};

  render() {
    const { item, plural, count, style, noLink } = this.props;

    let text = '';
    if (count > 1) {
      text += `${count} `;
    }
    text += item.name;
    if (count !== 1 || plural !== null) {
      text += (plural !== null ? plural : 's');
    }

    if (noLink) {
      return (
        <Typography component="span">
          <Item {...item} className="inline" />
          {text}
        </Typography>
      );
    }

    return (
      <ItemTooltip itemName={item.name}>
        <Link className="inline-link" style={style}>
          <Item {...item} className="inline" tooltipDisabled />
          {text}
        </Link>
      </ItemTooltip>
    );
  }
}

export default ItemLink;
