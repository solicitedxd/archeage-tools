import React from 'react';
import ReactHintFactory from 'react-hint';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import {
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import {
  applyTooltipColor,
  deepCopy,
  getPointReq,
  prepareComboText,
} from 'utils/skills';
import EffectIcon from 'components/Skill/EffectIcon';
import SKILLSET from 'data/skillsets';
import { substitute } from 'utils/string';

const ReactHint = ReactHintFactory(React);

const renderSkillTooltip = (target) => {
  let { skillset, skillId, passive, element, disabled, spentPoints } = target.dataset;
  skillId = Number(skillId);
  passive = passive === 'true';
  disabled = disabled === 'true';
  spentPoints = Number(spentPoints);

  const skillSetKey = Object.keys(SKILLSET).find(id => id === skillset);
  if (!skillSetKey) return;

  const skillSet = SKILLSET[skillSetKey];
  const skills = passive ? skillSet.passives : skillSet.skills;

  let skill = deepCopy(skills[skillId]);
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

  if (!passive && spentPoints >= 2) {
    const percentIncreases = {};
    skillSet.passives.forEach((passive, index) => {
      if (!passive.skillMod) return;
      const mods = passive.skillMod.filter(mod => mod.skills.includes(skillId));
      if (spentPoints > index + 1) {
        mods.forEach(mod => {
          if (mod.type === SKILLMOD.SET) {
            skill = { ...skill, ...mod.vars };
          }
          if (mod.type === SKILLMOD.FLAT) {
            Object.keys(mod.vars).forEach(key => skill[key] += mod.vars[key]);
          }
          if (mod.type === SKILLMOD.PERCENT) {
            Object.keys(mod.vars).forEach(key => {
              if (!skill[key]) return;
              if (key === 'range' && skill[key].length < 1) return;

              const diff = -1 * Math.round((1 - mod.vars[key]) * 100) / 100;
              if (percentIncreases[key]) {
                percentIncreases[key] += diff;
              } else {
                percentIncreases[key] = (1 + diff);
              }
            });
          }
        });
      }
    });
    Object.keys(percentIncreases).forEach(key => {
      const precision = key.match(/(castTime|duration|cooldown)/i) ? 10 : 1;
      const value = percentIncreases[key];
      if (key.match(/(damage|healing)/i)) {
        const { base, attack, ratio } = skill[key];
        skill[key] = { base: Math.floor(base * value), attack, ratio: Math.floor(ratio * value) };
      } else if (key === 'range') {
        skill[key][1] = Math.round(skill[key][1] * value);
      } else {
        skill[key] = Math.round((skill[key] * value) * precision) / precision;
      }
    });
  }

  const { name, icon, rank, mana, range, effectRange, castTime, channeled, cooldown, effects, description: rawDescription, combos } = skill;

  // prepare description
  let description = rawDescription || '';
  const desc = { ...skill };
  Object.keys(desc).forEach(key => {
    if (key.match(/(damage|healing)/i) && desc[key]) {
      const { base, ratio, attack } = desc[key];
      desc[key] = `&(${base} + ${ratio}% ${attack})&`;
    }
    if (key === 'effects') {
      desc.effects = desc.effects.map(effect => effect.name);
    }
  });
  description = substitute(description, desc);

  const { descriptionNote, ancestralNote, globalCooldown, continuousHold, unblockable, movement, cannotMiss, castTimeLevel, noCombat, noWalls, incapacitated } = skill;
  let descriptionNotes = [];
  if (descriptionNote) {
    descriptionNotes.push(descriptionNote);
  } else {
    descriptionNotes.push('');
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
    case GLOBAL_CD.REDUCED_USEWHILE:
      descriptionNotes.push('This skill has a reduced Global Cooldown.\rCan be used during a Global Cooldown.');
      break;
    case GLOBAL_CD.INCREASED:
      descriptionNotes.push('This skill has an increased Global Cooldown.');
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
  if (noWalls) {
    descriptionNotes.push('Can\'t pass through obstacles like walls.');
  }
  if (movement) {
    descriptionNotes.push('Can\'t be used while snared.');
  }
  if (noCombat) {
    descriptionNotes.push('Can\'t be used while in combat.');
  }
  if (incapacitated) {
    descriptionNotes.push('This skill can be used while the caster is incapacitated.');
  }
  if (descriptionNotes.length > 1 || descriptionNote) {
    description += `\r<span class="tt-bgreen description-note">${descriptionNotes.join('\r')}</span>`;
  }

  if (ancestralNote) {
    description += `<span class="tt-ancestral">${ancestralNote}</span>`;
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

  const damage = skill.damage || skill[Object.keys(skill).find(key => key.match(/(damage|healing)/i) && skill[key])];

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
        {mana && <p>Mana {mana}</p>}
        <p>Range: {range && range.length > 1 ? `${range.join('-')} m` : 'Caster only'}</p>
        {effectRange && <p>Effect Range: {effectRange} m</p>}
        <p>{damage ? `${damage.attack} +${damage.ratio}%` : <span>&nbsp;</span>}</p>
      </section>}
      {!passive &&
      <section>
        {!channeled && <p>{castTime > 0 ? `Cast Time: ${castTime} sec` : 'Instant'}</p>}
        {channeled && <p>Channeled Skill</p>}
        {cooldownTime && <p>{cooldownTime} Cooldown</p>}
      </section>}
      {!passive && effects && effects.length > 0 &&
      <section>
        <p>Effect Granted</p>
        <div className="skill-effects">
          {effects.map((effect, id) => <EffectIcon key={id} {...effect} />)}
        </div>
      </section>}
      <section className="description">
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </section>
      {combos && combos.length > 0 &&
      <section className="combos">
        <div className="combo-rows">
          {combos.map((combo, index) => (
            <div className="combo" key={index}>
              <EffectIcon {...combo.buff} />
              {combo.causes &&
              <div className="combo-arrow"><img alt="" /></div>}
              {combo.causes &&
              <EffectIcon {...combo.causes} />}
              <p className="tt-green" dangerouslySetInnerHTML={{ __html: prepareComboText(combo, skill) }} />
            </div>),
          )}
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
