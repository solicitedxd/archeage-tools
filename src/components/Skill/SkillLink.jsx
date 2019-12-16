import { Link } from '@material-ui/core';
import SkillTooltip from 'components/Skill/SkillTooltip';
import { ELEMENT } from 'constants/skills';
import SKILLSET from 'data/skillsets';
import React, { Component } from 'react';
import {
  bool,
  oneOf,
  string,
} from 'react-proptypes';
import Skill from './Skill';

class SkillLink extends Component {
  static propTypes = {
    name: string,
    id: string,
    skillset: string.isRequired,
    passive: bool,
    element: oneOf(Object.values(ELEMENT)),
  };

  static defaultProps = {
    element: ELEMENT.BASIC,
    passive: false,
  };

  render() {
    const { id, name, skillset, passive, element } = this.props;

    const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset.toUpperCase());
    if (!skillSetKey) return;

    const skillSet = SKILLSET[skillSetKey];
    const skills = passive ? skillSet.passives : skillSet.skills;

    let skill;
    if (id) {
      skill = skills.find(s => s.id === id);
    } else {
      skill = skills.find(s => s.name === name);
    }
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
      <SkillTooltip
        skillset={skillset.toUpperCase()}
        skillId={slot}
        passive={passive}
        element={element}
        spentPoints={5}
      >
        <Link className="inline-link">
          <Skill
            {...skill}
            {...ancestral || {}}
            slot={slot}
            skillset={skillset.toUpperCase()}
            passive={passive}
            element={element}
            learned
            disableTooltip
            className="inline"
          />
          {element !== ELEMENT.BASIC ? `[${element}] ` : ''}{skill.name}
        </Link>
      </SkillTooltip>
    );
  }
}

export default SkillLink;
