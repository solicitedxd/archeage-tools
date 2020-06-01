import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Skill from 'components/Skill';
import EffectIcon from 'components/Skill/EffectIcon';
import { equals } from 'ramda';
import React, { PureComponent } from 'react';
import { array } from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import {
  deepCopy,
  objectHasProperties,
} from 'utils/object';
import { substituteVars } from 'utils/skills';

class SkillCombos extends PureComponent {
  static propTypes = {
    skillsetData: array.isRequired,
  };

  state = {
    showAll: true,
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    return (!equals(this.props, nextProps) || !equals(this.state, nextState));
  }

  toggleVisibility = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  createComboRow = (combo, sub) => {
    const { skill, effect, activator, applies, combos } = combo;
    let nodes = [];
    // starting skill
    if (!sub) {
      nodes.push(
        <div className="combo-skill" key={`sk-${Math.random()}`}>
          <Skill
            id={skill.id}
            learned={skill.isLearned}
            noRequirement
            remainingPoints={0}
          />
          <EffectIcon
            {...effect}
            tooltip={`<span class="text-orange">${skill.name}</span> applies <span class="${effect.negative
              ? 'tt-debuff' : 'tt-buff'}">${effect.name}</span>`}
          />
        </div>,
      );
      nodes.push(<div className="combo-arrow" key={`ca2-${Math.random()}`} />);
    }

    // comboing skill
    const comboText = `<span class="text-orange">${activator.name}:</span> ${substituteVars(applies.text, skill.vars)}`;
    nodes.push(
      <div className="combo-skill" key={`skc-${Math.random()}`}>
        <Skill
          learned={activator.isLearned}
          noRequirement
          remainingPoints={0}
          {...activator}
        />
        {applies.applies ?
          <EffectIcon
            {...applies.applies}
            tooltip={comboText}
          /> :
          <Tooltip title={<div dangerouslySetInnerHTML={{ __html: comboText }} />}>
            <div className="combo-icon" />
          </Tooltip>
        }
      </div>,
    );
    if (combos && combos.length > 0) {
      nodes.push(<div key={`ca-${Math.random()}`} className="combo-arrow" />);
      if (combos.length > 1) {
        nodes = nodes.concat(
          <div className="combo-col" key={`cc-${Math.random()}`}>
            {combos.map((combo, index) =>
              <div
                className="combo-row"
                key={`c-${Math.random()}-${index}`}
              >
                {this.createComboRow(combo, true)}
              </div>,
            )}
          </div>,
        );
      } else {
        nodes = nodes.concat(this.createComboRow(combos[0], true));
      }
    }

    return nodes;
  };

  findComboSkills = (effect) => {
    const skills = [];
    this.comboSkills.forEach(comboSkill => {
      const skillCombos = comboSkill.combos.filter(combo => equals(combo.effect, effect));
      if (skillCombos.length > 0) {
        skills.push({ skill: comboSkill, combos: skillCombos });
      }
    });
    return skills;
  };

  createCombosForEffects = (skill, effects, notSkills) => {
    const combos = [];
    // add this skill to the list of subcombos to skip
    notSkills = deepCopy(notSkills);
    notSkills.push(skill.id);
    effects.forEach(effect => {
      // look for combos on this effect
      this.findComboSkills(effect).forEach(comboSkill_ => {
        const { skill: comboSkill, combos: skillCombos } = comboSkill_;
        if (notSkills.includes(comboSkill.id)) return;
        const causeEffects = skillCombos.filter(combo => combo.applies);
        const subCombos = causeEffects.length > 0
          ? this.createCombosForEffects(comboSkill, causeEffects.map(combo => combo.applies), notSkills) : null;
        skillCombos.forEach(comboEffect => {
          this.combos.push({
            skill,
            effect,
            activator: comboSkill,
            applies: comboEffect,
            combos: subCombos,
          });
        });
      });
    });
    return combos;
  };

  combos = [];
  comboSkills = [];
  comboActivators = [];

  render() {
    const { skillsetData, skillsets, skills: skillData } = this.props;
    const { showAll } = this.state;
    this.combos = [];
    this.comboSkills = [];
    this.comboActivators = [];

    skillsetData.forEach(skillTree => {
      const { id: skillsetId, skills, ancestrals } = skillTree;
      if (skillsetId === null || !objectHasProperties(skillsets)) return;
      const skillset = skillsets[skillsetId];
      let skillList = skillset.skills.map(s => deepCopy(skillData[s])).filter(s => Boolean(s));
      if (skillList.length === 0) return;
      // skillset.ancestrals.forEach((ancestral, ancestralId) => {
      //   const selected = ancestrals[ancestralId];
      //   if (selected === 1 || selected === 2) {
      //     skillList[ancestral.skillId] = {
      //       ...skillList[ancestral.skillId],
      //       ...ancestral.variants[selected - 1],
      //     };
      //   }
      // });
      // embed skill data
      skillList.forEach((skill, skillId) => {
        skill.isLearned = skills[skillId] === 1;
      });

      if (!showAll) {
        skillList = skillList.filter(s => s.isLearned);
      }

      this.comboSkills = this.comboSkills.concat(skillList.filter(skill => skill.combos && skill.combos.length > 0));
      this.comboActivators = this.comboActivators.concat(skillList.filter(skill => skill && skill.effects && skill.effects.length > 0));
    });

    // loop through all activators
    this.comboActivators.forEach(skill => {
      this.combos = this.combos.concat(this.createCombosForEffects(skill, skill.effects, []));
    });

    this.combos = this.combos.sort(sortBy('name'));

    return (
      <Paper className="skill-combos section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{showAll ? 'Available'
              : 'Learned'} Combos ({this.combos.length})</Typography>
            <Tooltip title={`Show ${showAll ? 'Only Learned' : 'All Available'} Combos`}>
              <IconButton color="inherit" aria-label="Toggle Visibility" onClick={this.toggleVisibility}>
                {showAll ? <ToggleOffIcon /> : <ToggleOnIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className="combos-list">
          {this.combos.length === 0 &&
          <Typography>You have no {showAll ? 'available' : 'learned'} combos.</Typography>}
          {this.combos.map((combo, index) =>
            <div className="combo-row" key={`c-${index}`}>
              {this.createComboRow(combo)}
            </div>,
          )}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ gameData: { skillsets, skills } }) => ({
  skillsets,
  skills,
});

export default connect(mapStateToProps, null)(SkillCombos);
