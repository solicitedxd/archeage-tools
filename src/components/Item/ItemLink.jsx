import {
  Link,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { Component } from 'react';
import {
  bool,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import Item from './Item';
import ItemTooltip from './ItemTooltip';

class ItemLink extends Component {
  static propTypes = {
    id: number.isRequired,
    plural: string,
    count: number,
    style: object,
    noLink: bool,
    name: string,
    item: object,
  };

  static defaultProps = {
    plural: null,
    count: 1,
    style: {},
    noLink: false,
    name: null,
  };

  state = {};

  render() {
    const { id, item, plural, count, style, noLink, name } = this.props;

    let text = '';
    let width = 80;
    if (count > 1) {
      text += `${count} `;
    }
    if (name !== null) {
      text += name;
      if (name === '') {
        width = 20;
      }
    } else {
      text += item.name;
      if (count !== 1 || plural !== null) {
        text += (plural !== null ? plural : 's');
      }
    }

    if (!item.icon) {
      text = <Skeleton variant="text" style={{ display: 'inline-block', marginLeft: 4, width }} />;
    }

    if (noLink) {
      return (
        <Typography component="span" style={style}>
          <Item id={id} inline />
          {text}
        </Typography>
      );
    }

    return (
      <ItemTooltip itemId={id} disabled={!item.icon}>
        <Link className="inline-link" style={style}>
          <Item id={id} inline tooltipDisabled />
          {text}
        </Link>
      </ItemTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { items } }, { id }) => ({
  item: items[id] || {},
});

export default connect(mapStateToProps)(ItemLink);
