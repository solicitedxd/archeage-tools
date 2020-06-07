import cn from 'classnames';
import Skill from 'components/Skill/Skill';
import React, { Component } from 'react';
import {
  number,
  string,
} from 'react-proptypes';

class SkillIcon extends Component {
  static propTypes = {
    id: number.isRequired,
    className: string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { id, className } = this.props;

    return (
      <Skill
        id={id}
        noRequirement={true}
        className={cn('cursor-help', className)}
        learned
      />
    );
  }
}

export default SkillIcon;
