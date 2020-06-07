import cn from 'classnames';
import Skill from 'components/Skill/Skill';
import React, { Component } from 'react';
import {
  bool,
  number,
  string,
} from 'react-proptypes';

class SkillIcon extends Component {
  static propTypes = {
    id: number.isRequired,
    className: string,
    disableTooltip: bool,
  };

  static defaultProps = {
    className: null,
    disableTooltip: false,
  };

  render() {
    const { id, className, disableTooltip } = this.props;

    return (
      <Skill
        id={id}
        noRequirement={true}
        className={cn('cursor-help', className)}
        learned
        disableTooltip={disableTooltip}
      />
    );
  }
}

export default SkillIcon;
