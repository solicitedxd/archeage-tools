import React from 'react';
import ReactHintFactory from 'react-hint';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import SKILLSET from 'constants/skillsets';
import {
  ELEMENT,
  GLOBAL_CD,
} from 'constants/skills';
import { getPointReq } from 'utils/skills';
import EffectIcon from 'components/Skill/EffectIcon';
import { substitute } from 'utils/string';

const ReactHint = ReactHintFactory(React);

const applyTooltipColor = (string) => string
.replace(/(#([\w\s,.%+():-]+)#)/g, (m, g0, text) => `<span class="tt-orange">${text}</span>`)
.replace(/(&([\w\s,.%+():-]+)&)/g, (m, g0, text) => `<span class="tt-scale">${text}</span>`)
.replace(/\r/g, () => '<br />');

const renderSkillTooltip = (target) => {
  let { skillset, skillId, passive, element, disabled } = target.dataset;
  skillId = Number(skillId);
  passive = passive === 'true';
  disabled = disabled === 'true';

  const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset);
  if (!skillSetKey) return;

  const skillSet = SKILLSET[skillSetKey];
  const skills = passive ? skillSet.passives : skillSet.skills;

  let skill = skills[skillId];
  // validate skill exists
  if (!skill) return;
  element = Object.values(ELEMENT).find(ele => ele === element);
  if (!element) {
    element = ELEMENT.BASIC;
  }

  const { name: skillsetName } = skillSet;
  if (element !== ELEMENT.BASIC) {
    const ancestral = skillSet.ancestrals.find(anc => anc.skillId === skillId);
    if (ancestral) {
      const variant = ancestral.variants.find(ele => ele.element === element);
      if (variant) {
        skill = { ...skill, ...variant };
      }
    }
  }

  const { name, icon, rank, mana, range, effectRange, damage, castTime, cooldown, effects, description: rawDescription, combos } = skill;

  // prepare description
  let description = rawDescription || '';
  description = substitute(description, {
    ...skill,
    damage: damage && `&(${damage.base} + ${damage.ratio}% ${damage.attack})&`,
    effects: effects && effects.map(effect => effect.name),
  });

  const { descriptionNote, globalCooldown, continuousHold, unblockable, movement, cannotMiss, castTimeLevel, noCombat, noWalls } = skill;
  let descriptionNotes = [];
  if (descriptionNote) {
    descriptionNotes.push(descriptionNote);
  }

  switch (globalCooldown) {
    case GLOBAL_CD.NONE:
      descriptionNotes.push('This skill does not trigger a Global Cooldown, and can be used during Global Cooldowns.');
      break;
    case GLOBAL_CD.NO_TRIGGER:
      descriptionNotes.push('This skill does not trigger a Global Cooldown.');
      break;
    case GLOBAL_CD.NO_TRIGGER_REDUCED:
      descriptionNotes.push('This skill does not trigger a Global Cooldown.\rThis skill has a reduced Global Cooldown.');
      break;
    case GLOBAL_CD.REDUCED:
      descriptionNotes.push('This skill has a reduced Global Cooldown.');
      break;
    case GLOBAL_CD.NORMAL:
    default:
    // do nothing
  }
  if (continuousHold) {
    descriptionNotes.push('Hold for continuous use.');
  }
  if (cannotMiss) {
    descriptionNotes.push('This skill never miss.');
  }
  if (castTimeLevel) {
    descriptionNotes.push('Cast time increases as this skill levels up.');
  }
  if (unblockable) {
    descriptionNotes.push('This skill cannot be evaded, blocked, or parried.');
  }
  if (movement) {
    descriptionNotes.push('Can\'t be used while snared.');
  }
  if (noCombat) {
    descriptionNotes.push('Can\'t be used while in combat.');
  }
  if (noWalls) {
    descriptionNotes.push('Can\'t pass through obstacles like walls.');
  }
  if (descriptionNotes.length > 0) {
    description += `\r\r<span class="tt-bgreen description-note">${descriptionNotes.join('\r')}</span>`;
  }

  description = applyTooltipColor(description);

  let cooldownTime = '';
  if (cooldown > 0) {
    if (cooldown > 59) {
      cooldownTime = `${Math.floor(cooldown / 60)}min`;
    }
    if (cooldown % 60 > 0) {
      cooldownTime += ` ${cooldown % 60}sec`;
    }
  }

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
            <Typography variant="h5" component="h5" className={cn('skill-type', element === ELEMENT.BASIC ? 'tt-orange'
              : 'tt-yellow')}>{element}</Typography>
          </div>}
          {passive && <Typography variant="h5" component="h5" className="passive-skill">Passive Skill</Typography>}
          <Typography variant="h4" component="h4"
                      className="passive-skill">{name}{!passive && ` (Rank ${rank || 1})`}</Typography>
        </div>
      </section>
      {!passive &&
      <section>
        <p>Mana {mana || 0}</p>
        <p>Range: {range && range.length > 1 ? `${range.join('-')} m` : 'Caster only'}</p>
        {effectRange && <p>Effect Range: {effectRange} m</p>}
        <p>{damage ? `${damage.attack} +${damage.ratio}%` : <span>&nbsp;</span>}</p>
      </section>}
      {!passive &&
      <section>
        <p>{castTime > 0 ? `Cast Time: ${castTime} sec` : 'Instant'}</p>
        {cooldownTime && <p>{cooldownTime} Cooldown</p>}
      </section>}
      {!passive && effects && effects.length > 0 &&
      <section>
        <p>Effect Granted</p>
        <div className="skill-effects">
          {effects.map((effect, id) => <EffectIcon key={id} {...effect} />)}
        </div>
      </section>}
      <section>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </section>
      {combos && combos.length > 0 &&
      <section className="combos">
        <div className="combo-rows">
          {combos.map((combo, index) => {
            let { text } = combo;
            text = substitute(text, {
              b: combo.buff && combo.buff.name,
              c: combo.causes && combo.causes.name,
            });
            text = applyTooltipColor(text);
            return (<div className="combo" key={index}>
              <EffectIcon {...combo.buff} />
              {combo.causes &&
              <div className="combo-arrow"><img alt="" /></div>}
              {combo.causes &&
              <EffectIcon {...combo.causes} />}
              <p className="tt-green" dangerouslySetInnerHTML={{ __html: text }} />
            </div>);
          })}
        </div>
      </section>}
      {disabled &&
      <section className="skill-requirements">
        <p>Learning Req.: [{skillsetName}] {passive ? skillId + 2 : getPointReq(skillId)} or
          higher</p>
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
