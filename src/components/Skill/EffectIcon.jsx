import React, { Component } from 'react';
import {
  bool,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import { Tooltip } from '@material-ui/core';

class EffectIcon extends Component {
  static propTypes = {
    icon: string.isRequired,
    name: string,
    negative: bool,
    className: string,
    tooltip: string,
  };

  static defaultProps = {
    name: '',
    negative: false,
    className: '',
    tooltip: '',
  };

  render() {
    const { icon, name, negative, className, tooltip } = this.props;
    return (
      <div className={cn('effect-icon', { 'debuff': negative }, className)}>
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: tooltip || name }} />}>
          <img src={icon} alt="" />
        </Tooltip>
      </div>
    );
  }
}

export default EffectIcon;
