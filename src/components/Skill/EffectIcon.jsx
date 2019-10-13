import React, { Component } from 'react';
import { string, bool } from 'react-proptypes';
import cn from 'classnames';

class EffectIcon extends Component {
  static propTypes = {
    icon: string.isRequired,
    negative: bool,
  };

  static defaultProps = {
    negative: false,
  };

  render() {
    const { icon, negative } = this.props;
    return (
      <div className={cn('effect-icon', { 'debuff': negative })}>
        <img src={icon} alt="" />
      </div>
    );
  }
}

export default EffectIcon;
