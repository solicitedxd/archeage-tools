import React, { Component } from 'react';
import {
  bool,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import {
  Tooltip,
  Typography,
} from '@material-ui/core';

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
        <Tooltip
          title={
            <React.Fragment>
              <Typography variant="caption" dangerouslySetInnerHTML={{ __html: tooltip || name }} />
            </React.Fragment>
          }
        >
          <img src={icon} alt="" />
        </Tooltip>
      </div>
    );
  }
}

export default EffectIcon;
