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
import SKILLSET from 'constants/skillsets';
import Skill from 'components/Skill';

class SkillTree extends Component {
  static propTypes = {
    treeId: number.isRequired,
    setSkillTree: func.isRequired,
    setSkill: func.isRequired,
    resetSkillTree: func.isRequired,
    skillTree: object.isRequired,
    skills: array,
    remainingPoints: number,
    selectedClasses: array,
  };

  static defaultProps = {
    skillTree: null,
    skills: [],
    remainingPoints: 0,
    selectedClasses: [],
  };

  state = {
    selectingSkillset: false,
  };

  toggleSelecting = (selectingSkillset) => {
    this.setState({ selectingSkillset });
  };

  setSkill = (skillId, value) => {

  };

  render() {
    const { skillTree, setSkillTree, resetSkillTree, setSkill, treeId, selectedClasses } = this.props;
    const { treeName, skills } = skillTree;
    const skillSet = SKILLSET[treeName];
    const { selectingSkillset } = this.state;
    const spentPoints = skills.length > 0 ? skills.reduce((a, b) => a + b) : 0;

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
                <IconButton color="inherit" aria-label="Reset">
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
          {Object.keys(SKILLSET).filter(skillTreeId => !selectedClasses.includes(skillTreeId)).map(skillTreeId => {
            const { name } = SKILLSET[skillTreeId];
            return (
              <Button
                onClick={() => setSkillTree(treeId, skillTreeId)}
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
          <Typography variant="overline">Combat</Typography>
          <div className="skill-list combat">
            {Object.values(skillSet.skills).map((skill, index) =>
              <div className="skill-container" data-col={(index % 4) + 1} key={skill.name}>
                <Skill
                  slot={index}
                  onClick={() => console.log('Clicked ', skill.name, index)}
                  learned={Boolean(skills[index])}
                  spentPoints={spentPoints}
                  {...skill}
                />
              </div>,
            )}
          </div>
          <Typography variant="overline">Passive</Typography>
          <div className="skill-list passive">
            {skillSet.passives.map((skill, index) =>
              <div className="skill-container" data-col={(index % 4) + 1} key={skill.name}>
                <Skill
                  passive
                  active={(spentPoints >= index + 2)}
                  slot={index}
                  {...skill}
                />
              </div>,
            )}
          </div>
        </div>
        }
      </Paper>
    );
  }
}

export default SkillTree;
