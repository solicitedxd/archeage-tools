import React from 'react';
import ReactHintFactory from 'react-hint';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import SKILLSET from 'constants/skillsets';
import { ELEMENT } from 'constants/skills';
import { getPointReq } from 'utils/skills';

const ReactHint = ReactHintFactory(React);

const renderSkillTooltip = (target) => {
  let { skillset, skillId, passive, element, disabled } = target.dataset;
  skillId = Number(skillId);
  passive = passive === 'true';
  disabled = disabled === 'true';

  const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset);
  if (!skillSetKey) return;

  const skillSet = SKILLSET[skillSetKey];
  const skills = passive ? skillSet.passives : skillSet.skills;

  const skill = skills[skillId];
  // validate skill exists
  if (!skill) return;
  element = Object.values(ELEMENT).find(ele => ele === element);
  if (!element) {
    element = ELEMENT.BASIC;
  }

  const { name: skillsetName } = skillSet;
  const { name, icon } = skill;

  return (
    <div className={cn({ 'passive': passive })}>
      <section className="header">
        <div className="skill-icon icon">
          <img src={icon} alt="" />
        </div>
        <div className="skill-name">
          {!passive &&
          <div className="skill-types">
            <Typography variant="h5" component="h5" className="tt-orange skillset">{skillsetName}</Typography>
            <Typography variant="h5" component="h5" className={cn('skill-type', element === ELEMENT.BASIC ? 'tt-orange' : 'tt-yellow')}>{element}</Typography>
          </div>}
          {passive && <Typography variant="h5" component="h5" className="passive-skill">Passive Skill</Typography>}
          <Typography variant="h4" component="h4" className="passive-skill">{name}</Typography>
        </div>
      </section>
      {disabled &&
      <section className="skill-requirements">
        <Typography>Learning Req.: [{skillsetName}] {passive ? skillId + 2 : getPointReq(skillId)} or
          higher</Typography>
      </section>
      }
    </div>
  );
};

const SkillTooltip = () => (
  <ReactHint
    attribute="data-skill"
    className="archeage-tooltip spell-tooltip"
    events
    onRenderContent={renderSkillTooltip}
    autoPosition
  />
);

export default SkillTooltip;
