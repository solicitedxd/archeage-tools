import { Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import SkillIcon from 'components/Skill/SkillIcon';
import SkillTooltip from 'components/Skill/SkillTooltip';
import { ELEMENT } from 'constants/skills';
import React, { Component } from 'react';
import {
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';

class SkillLink extends Component {
  static propTypes = {
    id: number.isRequired,
    skill: object,
  };

  render() {
    const { id, skill } = this.props;
    const { name, icon, passive, ancestralElement: element } = skill;

    let text = '';
    if (passive) {
      text += '[Passive] ';
    } else if (element && element !== ELEMENT.BASIC) {
      text += `[${element}] `;
    }
    text += name;

    if (!icon) {
      text = (
        <Skeleton
          variant="text"
          style={{ display: 'inline-block', marginLeft: 4, width: 80, height: 20, transform: 'none' }}
        />
      );
    }

    return (
      <SkillTooltip skillId={id}>
        <Link className="inline-link">
          <SkillIcon id={id} className="inline" disableTooltip />
          {text}
        </Link>
      </SkillTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { skills } }, { id }) => ({
  skill: skills[id] || {},
});

export default connect(mapStateToProps)(SkillLink);
