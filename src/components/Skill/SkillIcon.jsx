import React, { Component } from 'react';
import {
  bool,
  oneOf,
  string,
  number,
} from 'react-proptypes';
import { ELEMENT } from 'constants/skills';
import SKILLSET from 'data/skillsets';
import { Link } from '@material-ui/core';
import Skill from 'components/Skill/Skill';

class SkillIcon extends Component {
  static propTypes = {
    name: string,
    id: string,
    skillset: string.isRequired,
    passive: bool,
    element: oneOf(Object.values(ELEMENT)),
    requiredLevel: number,
  };

  static defaultProps = {
    name: null,
    id: null,
    passive: false,
    element: ELEMENT.BASIC,
    requiredLevel: null,
  };

  state = {};

  render() {
    const { id, name, skillset, passive, element, requiredLevel } = this.props;

    const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset.toUpperCase());
    if (!skillSetKey) return;

    const skillSet = SKILLSET[skillSetKey];
    const skills = passive ? skillSet.passives : skillSet.skills;

    const skill = skills.find(s => {
      if (id && s.id) {
        return s.id === id;
      } else {
        return s.name === name;
      }
    });

    if (!skill) {
      return (
        <Link>
          Invalid Ability
        </Link>
      );
    }
    const slot = skills.indexOf(skill);
    const ancestral = element !== ELEMENT.BASIC && skillSet.ancestrals.find(anc => anc.skillId === slot).variants.find(anc => anc.element === element);

    return (
      <Skill
        {...skill}
        {...ancestral || {}}
        slot={slot}
        skillset={skillset.toUpperCase()}
        passive={passive}
        element={element}
        requiredLevel={requiredLevel}
        learned
      />
    );
  }
}

export default SkillIcon;
