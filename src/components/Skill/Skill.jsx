import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import { getPointReq } from 'utils/skills';
import { MAX_POINTS } from 'constants/skills';

class Skill extends Component {
  static propTypes = {
    icon: string.isRequired,
    passive: bool,
    learned: bool,
    spentPoints: number,
    slot: number.isRequired,
    onClick: func,
  };

  static defaultProps = {
    active: false,
    passive: false,
    learned: false,
    spentPoints: 0,
    onClick: () => {},
  };

  state = {};

  render() {
    const { icon, name, passive, spentPoints, slot, onClick, learned } = this.props;
    const pointsRequired = passive ? slot + 2 : getPointReq(slot);
    const disabled = passive ? !learned : (spentPoints < pointsRequired || (spentPoints === MAX_POINTS && !learned));

    return (
      <div
        className={cn('skill', { 'disabled': disabled }, { 'available': !disabled && !learned })}
        onClick={disabled ? null : onClick}
        data-points-req={pointsRequired}
      >
        <img src={icon} alt="" />
      </div>
    );
  }
}

export default Skill;
