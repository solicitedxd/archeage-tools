import React, { Component } from 'react';
import {
  array,
  func,
  number,
  object,
} from 'react-proptypes';
import {
  AppBar,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Close,
  Replay,
  SwapHoriz,
} from '@material-ui/icons';
import Skill from 'components/Skill';
import SKILLSET from 'data/skillsets';
import { getTreePoints } from 'utils/skills';

class SkillTree extends Component {
  static propTypes = {
    treeId: number.isRequired,
    setSkillTree: func.isRequired,
    setSkill: func.isRequired,
    setAncestral: func.isRequired,
    resetSkillTree: func.isRequired,
    skillTree: object.isRequired,
    remainingPoints: number,
    selectedClasses: array,
  };

  static defaultProps = {
    skillTree: null,
    remainingPoints: 0,
    selectedClasses: [],
  };

  state = {
    selectingSkillset: false,
  };

  toggleSelecting = (selectingSkillset) => {
    this.setState({ selectingSkillset });
  };

  render() {
    const { skillTree, setSkillTree, resetSkillTree, setSkill, setAncestral, treeId, selectedClasses, remainingPoints } = this.props;
    const { treeName, skills, ancestrals } = skillTree;
    const skillSet = SKILLSET[treeName];
    const { selectingSkillset } = this.state;
    const spentPoints = getTreePoints(skills);

    return (
      <Paper className="skill-tree">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1"
                        className="title-text">{skillSet && !selectingSkillset && skillSet.name || 'Select Skillset'}</Typography>
            <Typography variant="subtitle2">{skillSet && !selectingSkillset && `${spentPoints}/12`}</Typography>
            {skillSet &&
            <div>
              {!selectingSkillset &&
              <Tooltip title="Reset Tree">
                <IconButton color="inherit" aria-label="Reset" onClick={() => resetSkillTree(treeId)}>
                  <Replay />
                </IconButton>
              </Tooltip>}
              <Tooltip title={selectingSkillset ? 'Cancel' : 'Swap Tree'}>
                <IconButton color="inherit" aria-label="Swap" onClick={() => this.toggleSelecting(!selectingSkillset)}>
                  {selectingSkillset ? <Close /> : <SwapHoriz />}
                </IconButton>
              </Tooltip>
            </div>}
          </Toolbar>
        </AppBar>
        {(!treeName || selectingSkillset) &&
        <div className="skill-tree-list">
          {Object.entries(SKILLSET)
          .filter(([skillTreeId, skillTree]) => !selectedClasses.includes(skillTreeId) && skillTree.visible !== false)
          .map(([skillTreeId, skillTree]) => {
            const { name } = skillTree;
            return (
              <Button
                onClick={() => {
                  this.toggleSelecting(false);
                  setSkillTree(treeId, skillTreeId);
                }}
                key={`${treeId}-${skillTreeId}`}
                className="skill-set-button"
              >
                {name}
              </Button>
            );
          })}
        </div>}
        {(treeName && !selectingSkillset) &&
        <div className="skill-list-container">
          <Typography variant="overline" className="skill-list-title">Combat</Typography>
          <div className="skill-list combat">
            {Object.values(skillSet.skills).map((skill, index) => {
              const ancestral = skillSet.ancestrals.find(anc => anc.skillId === index);
              if (ancestral) {
                const ancestralId = skillSet.ancestrals.indexOf(ancestral);
                if (ancestralId >= 0 && ancestrals[ancestralId] > 0) {
                  skill = { ...skill, ...ancestral.variants[ancestrals[ancestralId] - 1] };
                }
              }
              return (
                <div className="skill-container" data-col={(index % 4) + 1} key={skill.name}>
                  <Skill
                    skillset={treeName}
                    slot={index}
                    onClick={() => setSkill(treeId, index, !Boolean(skills[index]))}
                    learned={Boolean(skills[index])}
                    spentPoints={spentPoints}
                    remainingPoints={remainingPoints}
                    {...skill}
                  />
                </div>);
            })}
          </div>
          <Typography variant="overline" className="skill-list-title">Passive</Typography>
          <div className="skill-list passive">
            {skillSet.passives.map((skill, index) =>
              <div className="skill-container" data-col={(index % 4) + 1} key={skill.name}>
                <Skill
                  skillset={treeName}
                  passive
                  learned={(spentPoints >= index + 2)}
                  slot={index}
                  {...skill}
                />
              </div>,
            )}
          </div>
          <Typography variant="overline" className="skill-list-title">Ancestral</Typography>
          <div className="ancestral-list">
            {skillSet.ancestrals.length === 0 &&
            <Typography variant="overline" style={{ textAlign: 'center' }}>No ancestrals.</Typography>}
            {skillSet.ancestrals.map((ancestral, ancestralId) => {
              const original = skillSet.skills.find((skill, id) => id === ancestral.skillId);
              const selected = ancestrals[ancestralId];
              return (
                <div className="ancestral-row" key={ancestralId}>
                  <div className="ancestral-level">
                    <span className="dropdown-icon Ancestral" />
                    <Typography variant="subtitle1">{(ancestralId * 3) + 1}</Typography>
                  </div>
                  <div className="ancestral-options">
                    <Skill
                      skillset={treeName}
                      ancestral
                      slot={ancestral.skillId}
                      onClick={() => setAncestral(treeId, ancestralId, 0)}
                      learned={selected !== 1 && selected !== 2}
                      spentPoints={spentPoints}
                      {...original}
                    />
                    {ancestral.variants.map((element, id) => (
                      <Skill
                        key={`${ancestral.skillId}-${element.element}`}
                        skillset={treeName}
                        ancestral
                        slot={ancestral.skillId}
                        onClick={() => setAncestral(treeId, ancestralId, id + 1)}
                        learned={selected === id + 1}
                        spentPoints={spentPoints}
                        {...original}
                        {...element}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        }
      </Paper>
    );
  }
}

export default SkillTree;
