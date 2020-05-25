import { Skeleton } from '@material-ui/lab';
import { fetchItem } from 'actions/gameData';
import cn from 'classnames';
import React, { Component } from 'react';
import {
  bool,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';
import ItemTooltip from './ItemTooltip';

class Item extends Component {
  static propTypes = {
    id: number.isRequired,
    grade: number,
    count: number,
    tooltipDisabled: bool,
    inline: bool,
  };

  static defaultProps = {
    grade: 1,
    count: 1,
    tooltipDisabled: false,
    inline: false,
  };

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (!nextProps.name) {
  //     fetchItem(this.props.id);
  //   }
  // }

  componentDidMount() {
    fetchItem(this.props.id);
  }

  render() {
    const { id, name, icon, count, defaultGrade, overlay, inline, tooltipDisabled } = this.props;
    let { grade } = this.props;
    if (defaultGrade !== grade && defaultGrade > 1) {
      grade = defaultGrade;
    }

    if (!icon) return (
      <Skeleton
        variant="rect"
        width={inline ? 20 : '100%'}
        height={inline ? 20 : '100%'}
        style={{ display: inline ? 'inline-block' : 'block' }}
      />
    );

    return (
      <ItemTooltip itemId={id} grade={grade} disabled={tooltipDisabled || !name}>
        <span className={cn('item-icon', { [overlay]: Boolean(overlay), inline })} data-grade={grade} data-id={id}>
          <img src={`/images/icon/${icon}.png`} alt={name} />
          <span className="count">{count}</span>
        </span>
      </ItemTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { items } }, { id }) => {
  const item = items[id] || {};
  if (!item) return {};
  const { grade, ...itemFull } = item;
  return {
    ...itemFull,
    defaultGrade: grade,
  };
};

export default connect(mapStateToProps, null)(Item);
