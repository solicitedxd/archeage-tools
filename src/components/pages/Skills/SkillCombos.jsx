import React, { Component } from 'react';
import { array } from 'react-proptypes';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ToggleOff,
  ToggleOn,
} from '@material-ui/icons';
import SKILLSET from 'data/skillsets';
import {
  compareBuff,
  deepCopy,
  prepareComboText,
} from 'utils/skills';
import Skill from 'components/Skill';
import EffectIcon from 'components/Skill/EffectIcon';

class SkillCombos extends Component {
  static propTypes = {
    skillTrees: array.isRequired,
  };

  state = {
    showAll: true,
  };

  toggleVisibility = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  createComboRow = (combo, sub) => {
    const { skill, effect, activator, causes, combos } = combo;
    let nodes = [];
    // starting skill
    if (!sub) {
      nodes.push(
        <div className="combo-skill">
          <Skill
            skillset={skill.treeName}
            slot={skill.skillId}
            learned={skill.learned}
            noRequirement
            remainingPoints={0}
            {...skill}
          />
          <EffectIcon
            {...effect}
            tooltip={`<span class="tt-orange">${skill.name}</span> applies <span class="${effect.negative ? 'tt-debuff'
              : 'tt-buff'}">${effect.name}</span>`}
          />
        </div>,
      );
      nodes.push(<div className="combo-arrow" />);
    }

    // comboing skill
    const comboText = `<span class="tt-orange">${activator.name}:</span> ${prepareComboText(causes, activator)}`;
    nodes.push(
      <div className="combo-skill">
        <Skill
          skillset={activator.treeName}
          slot={activator.skillId}
          learned={activator.learned}
          noRequirement
          remainingPoints={0}
          {...activator}
        />
        {causes.causes ?
          <EffectIcon
            {...causes.causes}
            tooltip={comboText}
          /> :
          <Tooltip
            title={
              <React.Fragment>
                <Typography variant="caption" dangerouslySetInnerHTML={{ __html: comboText }} />
              </React.Fragment>
            }
          >
            <div className="combo-icon" />
          </Tooltip>
        }
      </div>,
    );
    if (combos && combos.length > 0) {
      nodes.push(<div className="combo-arrow" />);
      nodes = nodes.concat(<div className="combo-col">
        {combos.map((combo, index) => <div className="combo-row" key={index}>{this.createComboRow(combo, true)}</div>)}
      </div>);
    }

    return nodes;
  };

  render() {
    const { skillTrees } = this.props;
    const { showAll } = this.state;
    let combos = [];
    let comboSkills = [];
    let comboActivators = [];

    skillTrees.forEach(skillTree => {
      const { treeName, skills, ancestrals } = skillTree;
      if (!treeName) return;
      const skillSet = SKILLSET[treeName];
      let skillList = deepCopy(skillSet.skills);
      skillSet.ancestrals.forEach((ancestral, ancestralId) => {
        const selected = ancestrals[ancestralId];
        if (selected === 1 || selected === 2) {
          skillList[ancestral.skillId] = {
            ...skillList[ancestral.skillId],
            ...ancestral.variants[selected - 1],
          };
        }
      });
      // embed skill data
      skillList.forEach((skill, skillId) => {
        skill.treeName = treeName;
        skill.learned = skills[skillId] === 1;
        skill.skillId = skillId;
      });

      if (!showAll) {
        skillList = skillList.filter((skill, skillId) => skills[skillId] === 1);
      }

      comboSkills = comboSkills.concat(skillList.filter(skill => skill.combos && skill.combos.length > 0));
      comboActivators = comboActivators.concat(skillList.filter(skill => skill && skill.effects && skill.effects.length > 0));
    });

    const findComboSkills = (effect) => {
      const skills = [];
      comboSkills.forEach(comboSkill => {
        const combos = comboSkill.combos.filter(combo => compareBuff(combo.buff, effect));
        if (combos.length > 0) {
          skills.push({ skill: comboSkill, combos });
        }
      });
      return skills;
    };

    const createCombosForEffects = (skill, effects, notSkills) => {
      const combos = [];
      // add this skill to the list of subcombos to skip
      notSkills = deepCopy(notSkills);
      notSkills.push(skill.name);
      effects.forEach(effect => {
        // look for combos on this effect
        findComboSkills(effect).forEach(comboSkill_ => {
          const { skill: comboSkill, combos: comboEffects } = comboSkill_;
          if (notSkills.includes(comboSkill.name)) return;
          const causeEffects = comboEffects.filter(combo => combo.causes);
          const subCombos = causeEffects.length > 0
            ? createCombosForEffects(comboSkill, causeEffects.map(combo => combo.causes), notSkills) : null;
          comboEffects.forEach(comboEffect => {
            combos.push({
              skill,
              effect,
              activator: comboSkill,
              causes: comboEffect,
              combos: subCombos,
            });
          });
        });
      });
      return combos;
    };

    // loop through all activators
    comboActivators.forEach(skill => {
      combos = combos.concat(createCombosForEffects(skill, skill.effects, []));
    });

    combos = combos.sort((a, b) => a.skill.name > b.skill.name);

    return (
      <Paper className="skill-combos section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{showAll ? 'Available'
              : 'Learned'} Combos ({combos.length})</Typography>
            <Tooltip title={`Show ${showAll ? 'Only Learned' : 'All Available'} Combos`}>
              <IconButton color="inherit" aria-label="Toggle Visibility" onClick={this.toggleVisibility}>
                {showAll ? <ToggleOff /> : <ToggleOn />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className="combos-list">
          {combos.length === 0 &&
          <Typography>You have no {showAll ? 'available' : 'learned'} combos.</Typography>}
          {combos.map((combo, index) =>
            <div className="combo-row" key={index}>
              {this.createComboRow(combo)}
            </div>,
          )}
        </div>
      </Paper>
    );
  }
}

export default SkillCombos;
