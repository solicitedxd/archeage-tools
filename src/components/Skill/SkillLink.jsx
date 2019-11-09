import React, { Component } from 'react';
import {
  bool,
  string,
  oneOf,
} from 'react-proptypes';
import { Link } from '@material-ui/core';
import { ELEMENT } from 'constants/skills';
import SKILLSET from 'data/skillsets';
import Skill from './Skill';

class SkillLink extends Component {
  static propTypes = {
    name: string.isRequired,
    skillset: string.isRequired,
    passive: bool,
    element: oneOf(Object.values(ELEMENT)),
  };

  static defaultProps = {
    element: ELEMENT.BASIC,
    passive: false,
  };

  render() {
    const { name, skillset, passive, element } = this.props;

    const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset.toUpperCase());
    if (!skillSetKey) return;

    const skillSet = SKILLSET[skillSetKey];
    const skills = passive ? skillSet.passives : skillSet.skills;

    const skill = skills.find(s => s.name === name);
    if (!skill) {
      return (
        <Link>
          Invalid Ability
        </Link>
      )
    }
    const slot = skills.indexOf(skill);
    const ancestral = element !== ELEMENT.BASIC && skillSet.ancestrals.find(anc => anc.skillId === slot).variants.find(anc => anc.element === element);

    return (
      <Link
        data-points-req={0}
        data-skill={true}
        data-skillset={skillset.toUpperCase()}
        data-skill-id={slot}
        data-passive={passive}
        data-disabled={false}
        data-spent-points={5}
        data-element={element}
        className="inline-link"
      >
        <Skill
          {...skill}
          {...ancestral || {}}
          slot={slot}
          skillset={skillset.toUpperCase()}
          passive={passive}
          element={element}
          learned
          className="inline"
        />
        {element !== ELEMENT.BASIC ? `[${element}] ` : ''}{skill.name}
      </Link>
    );
  }
}

export default SkillLink;
