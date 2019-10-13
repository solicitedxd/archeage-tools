import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  oneOf,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import { getPointReq } from 'utils/skills';
import { ELEMENT } from 'constants/skills';

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
  };

  state = {};

  render() {
    const { icon, passive, spentPoints, slot, onClick, learned, skillset, remainingPoints, ancestral, element } = this.props;
    const pointsRequired = passive ? slot + 2 : getPointReq(slot);
    const disabled = passive ? !learned
      : !learned && !ancestral && (spentPoints < pointsRequired || remainingPoints === 0);

    return (
      <div
        className={cn('skill', { 'disabled': disabled }, { 'available': !disabled && !learned }, { 'ancestral': ancestral })}
        onClick={disabled ? null : onClick}
        data-points-req={ancestral || learned || spentPoints >= pointsRequired ? 0 : pointsRequired}
        data-skill={true}
        data-skillset={skillset}
        data-skill-id={slot}
        data-passive={passive}
        data-disabled={disabled && spentPoints < pointsRequired}
        data-spent-points={spentPoints}
        data-element={element}
      >
        <img src={icon} alt="" />
      </div>
    );
  }
}

export default Skill;
