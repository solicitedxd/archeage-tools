import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  oneOf,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import SkillTooltip from 'components/Skill/SkillTooltip';
import { ELEMENT } from 'constants/skills';
import { getPointReq } from 'utils/skills';

class Skill extends Component {
  static propTypes = {
    icon: string.isRequired,
    passive: bool,
    learned: bool,
    spentPoints: number,
    slot: number.isRequired,
    skillset: string.isRequired,
    remainingPoints: number,
    onClick: func,
    ancestral: bool,
    element: oneOf(Object.values(ELEMENT)),
    noRequirement: bool,
    className: string,
    disableTooltip: bool,
  };

  static defaultProps = {
    active: false,
    passive: false,
    learned: false,
    spentPoints: 0,
    remainingPoints: 0,
    onClick: () => {
    },
    ancestral: false,
    element: ELEMENT.BASIC,
    noRequirement: false,
    className: '',
    disableTooltip: false,
  };

  state = {};

  render() {
    const { icon, passive, spentPoints, slot, onClick, learned, skillset, remainingPoints, ancestral, noRequirement, element, className, disableTooltip } = this.props;
    const pointsRequired = passive ? slot + 2 : getPointReq(slot);
    const disabled = passive ? !learned
      : !learned && !ancestral && (spentPoints < pointsRequired || remainingPoints === 0);

    return (
      <SkillTooltip
        skillset={skillset}
        skillId={slot}
        passive={passive}
        disabled={disabled && spentPoints < pointsRequired}
        spentPoints={spentPoints}
        element={element}
        disableTooltip={disableTooltip}
      >
        <span
          className={cn('skill', className, { 'disabled': disabled }, { 'available': !disabled && !learned }, { 'ancestral': ancestral })}
          onClick={disabled ? null : onClick}
          data-points-req={ancestral || learned || noRequirement || spentPoints >= pointsRequired ? 0 : pointsRequired}
        >
          <img src={icon} alt="" />
        </span>
      </SkillTooltip>
    );
  }
}

export default Skill;
