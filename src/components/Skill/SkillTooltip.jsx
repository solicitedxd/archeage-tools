import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import EffectIcon from 'components/Skill/EffectIcon';
import { ELEMENT } from 'constants/skills';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  node,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  getPointReq,
  renderTime,
  substituteVars,
} from 'utils/skills';

// eslint-disable-next-line complexity
const TooltipContent = (skill) => {
  // TODO: handle passive increases
  // if (!passive && spentPoints >= 2 && skillSet.passives) {
  //   const percentIncreases = {};
  //   skillSet.passives.forEach((passive, index) => {
  //     if (!passive.skillMod) return;
  //     const mods = passive.skillMod.filter(mod => mod.skills.includes(skillId));
  //     if (spentPoints > index + 1) {
  //       mods.forEach(mod => {
  //         if (mod.type === SKILLMOD.SET) {
  //           skill = { ...skill, ...mod.vars };
  //         }
  //         if (mod.type === SKILLMOD.FLAT) {
  //           Object.keys(mod.vars).forEach(key => skill[key] += mod.vars[key]);
  //         }
  //         if (mod.type === SKILLMOD.PERCENT) {
  //           Object.keys(mod.vars).forEach(key => {
  //             if (!skill[key]) return;
  //             if (key === 'range' && skill[key].length < 1) return;
  //
  //             const diff = -1 * Math.round((1 - mod.vars[key]) * 100) / 100;
  //             if (percentIncreases[key]) {
  //               percentIncreases[key] += diff;
  //             } else {
  //               percentIncreases[key] = (1 + diff);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  //   Object.keys(percentIncreases).forEach(key => {
  //     const precision = key.match(/(castTime|duration|cooldown)/i) ? 10 : 1;
  //     const value = percentIncreases[key];
  //     if (key.match(/(damage|healing)/i)) {
  //       const { base, attack, ratio } = skill[key];
  //       skill[key] = { base: Math.floor(base * value), attack, ratio: Math.floor(ratio * value) };
  //     } else if (key === 'range') {
  //       skill[key][1] = Math.round(skill[key][1] * value);
  //     } else {
  //       skill[key] = Math.round((skill[key] * value) * precision) / precision;
  //     }
  //   });
  // }

  const { id, name, icon, rank, requiredLevel, mana, minRange, maxRange, effectRange, castTime, channeled, cooldown, effects, description: rawDescription, combos, vars, ancestralElement, skillset, passive, shifted, disabled } = skill;

  // prepare description
  const description = substituteVars(rawDescription, vars, passive, shifted);

  let damage = vars.find(v => v.key === 'damage_detail');
  if (!damage) {
    damage = vars.find(v => v.key === 'heal_detail');
  }

  return (
    <div className={cn({ passive })}>
      {shifted &&
      <section className="id">
        ID: {id}
      </section>}
      <section className="header">
        <div className="skill-icon icon">
          <img src={`/images/icon/${icon}.png`} alt="" />
        </div>
        <div className="skill-name">
          {!passive &&
          <div className="skill-types">
            <Typography variant="h5" className="text-orange skillset">{skillset.name}</Typography>
            {skillset.id > 0 &&
            <Typography
              variant="h5"
              className={cn('skill-type', ancestralElement === ELEMENT.BASIC ? 'text-orange' : 'text-yellow')}
            >
              {ancestralElement}
            </Typography>}
          </div>}
          {passive && <Typography variant="h5" className="passive-skill">Passive Skill</Typography>}
          <Typography variant="h4" className="passive-skill">
            {name}{!passive && skillset.id > 0 && ` (Rank ${rank || 1})`}
          </Typography>
        </div>
      </section>
      {!passive &&
      <section>
        {mana > 0 && <p>Mana {mana}</p>}
        <p>Range: {maxRange ? `${minRange || 0}-${maxRange} m` : 'Caster only'}</p>
        {effectRange && <p>Effect Range: {effectRange} m</p>}
        <p>{damage ? `${damage.powerType} +${damage.ratio}%` : <span>&nbsp;</span>}</p>
      </section>}
      {!passive &&
      <section>
        {!channeled && <p>{castTime > 0 ? `Cast Time: ${castTime.toFixed(1)} sec` : 'Instant'}</p>}
        {channeled && <p>Channeled Skill</p>}
        {cooldown > 0 && <p>{renderTime(cooldown)} Cooldown</p>}
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
              <EffectIcon {...combo.effect} />
              {combo.applies &&
              <>
                <div className="combo-arrow"><img alt="" /></div>
                <EffectIcon {...combo.applies} />
              </>}
              <p className="text-green"
                 dangerouslySetInnerHTML={{ __html: substituteVars(combo.text, vars, passive, shifted) }} />
            </div>),
          )}
        </div>
      </section>}
      {(disabled || (requiredLevel && skillset.id === 0)) &&
      <section className="skill-requirements">
        {disabled &&
        <p>Learning Req.: [{skillset.name}] {passive ? requiredLevel : getPointReq(requiredLevel)} or higher</p>}
        {requiredLevel && skillset.id === 0 && <p>Pet must be Lv{requiredLevel}+ to use.</p>}
      </section>
      }
    </div>
  );
};

class SkillTooltip extends Component {
  static propTypes = {
    skillId: number.isRequired,
    disabled: bool,
    spentPoints: number,
    disableTooltip: bool,
    children: node.isRequired,
  };

  static defaultProps = {
    disabled: false,
    spentPoints: 0,
    disableTooltip: false,
  };

  state = {
    shifted: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.setShifted);
    window.addEventListener('keyup', this.setShifted);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.setShifted);
    window.removeEventListener('keyup', this.setShifted);
  }

  setShifted = (e) => {
    // eslint-disable-next-line no-undef
    this.setState({ shifted: __DEVELOPMENT__ && Boolean(e.shiftKey) });
  };

  render() {
    const { children, disableTooltip, skillId, ...skill } = this.props;
    const { shifted } = this.state;

    if (disableTooltip || !skill.id) {
      return children;
    }

    return (
      <Tooltip
        title={<TooltipContent {...skill} shifted={shifted} />}
        classes={{ tooltip: 'archeage-tooltip spell-tooltip' }}
        PopperProps={{
          placement: 'right-start',
          modifiers: {
            flip: {
              boundariesElement: 'viewport',
            },
            preventOverflow: {
              boundariesElement: 'viewport',
            },
          },
        }}
        id={`skill-${skillId}`}
      >
        {children}
      </Tooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { skills, skillsets } }, { skillId }) => {
  const skill = pathOr({}, [skillId])(skills);
  return {
    ...skill,
    skillset: pathOr({ id: 0, name: 'Basic' }, [skill.skillsetId])(skillsets),
  };
};

export default connect(mapStateToProps)(SkillTooltip);
