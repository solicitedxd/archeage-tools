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
    active: bool,
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
    const { icon, name, active, passive, spentPoints, slot, onClick } = this.props;
    const pointsRequired = passive ? slot + 2 : getPointReq(slot);
    const disabled = passive ? !active : (spentPoints < pointsRequired || spentPoints === MAX_POINTS);

    return (
      <div className={cn('skill', { 'disabled': disabled })} onClick={disabled ? null : onClick}>
        <img src={icon} alt="" />
      </div>
    );
  }
}

export default Skill;
