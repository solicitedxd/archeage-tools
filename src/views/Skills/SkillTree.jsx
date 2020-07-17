import {
  AppBar,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { fetchSkill } from 'actions/gameData';
import Skill from 'components/Skill';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { getTreePoints } from 'utils/skills';

class SkillTree extends Component {
  static propTypes = {
    treeId: number.isRequired,
    setSkillTree: func.isRequired,
    setSkill: func.isRequired,
    setAncestral: func.isRequired,
    resetSkillTree: func.isRequired,
    treeData: object.isRequired,
    remainingPoints: number,
    selectedSkillset: array,
    skillsets: object,
    skills: object,
  };

  static defaultProps = {
    treeData: null,
    remainingPoints: 0,
    selectedSkillset: [],
  };

  state = {
    selectingSkillset: false,
  };

  toggleSelecting = (selectingSkillset) => {
    this.setState({ selectingSkillset });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.treeData.id && this.props.treeData.id !== nextProps.treeData.id && objectHasProperties(nextProps.skillsets)) {
      nextProps.skillsets[nextProps.treeData.id].ancestrals.forEach(skillId => fetchSkill(skillId));
    }
  }

  render() {
    const { treeData, setSkillTree, resetSkillTree, setSkill, setAncestral, treeId, selectedSkillset, remainingPoints, skillsets, skills } = this.props;
    const { id: skillsetId, skills: selSkills, ancestrals: selAncestrals } = treeData;
    const skillset = skillsets[skillsetId] || {};
    const { selectingSkillset } = this.state;
    const spentPoints = getTreePoints(selSkills);

    const basicSkills = skillset.skills || [];
    const ancestralSkills = (skillset.ancestrals || []).map(id => skills[id] || {});
    const passiveSkills = skillset.passives || [];

    const showName = skillsetId && !selectingSkillset;

    return (
      <Paper className="skill-tree">
        <AppBar position="static">
          <Toolbar variant="dense">
            {showName && <span className="skillset-icon" data-id={skillsetId} />}
            <Typography variant="subtitle1" className="title-text">
              {showName ? skillset.name : 'Select Skillset'}
            </Typography>
            <Typography variant="subtitle2">{showName && `${spentPoints}/12`}</Typography>
            {skillsetId &&
            <div>
              {!selectingSkillset &&
              <Tooltip title="Reset Tree">
                <IconButton color="inherit" aria-label="Reset" onClick={() => resetSkillTree(treeId)}>
                  <ReplayIcon />
                </IconButton>
              </Tooltip>}
              <Tooltip title={selectingSkillset ? 'Cancel' : 'Swap Tree'}>
                <IconButton color="inherit" aria-label="Swap" onClick={() => this.toggleSelecting(!selectingSkillset)}>
                  {selectingSkillset ? <CloseIcon /> : <SwapHorizIcon />}
                </IconButton>
              </Tooltip>
            </div>}
          </Toolbar>
        </AppBar>
        {(!skillsetId || selectingSkillset) &&
        <div className="skill-tree-list">
          {Object.values(skillsets)
          .filter(({ id }) => !selectedSkillset.includes(id))
          .sort(sortBy('name'))
          .map((skillTree) => {
            const { id, name } = skillTree;
            return (
              <Button
                onClick={() => {
                  this.toggleSelecting(false);
                  setSkillTree(treeId, id);
                }}
                key={`${treeId}-${id}`}
                className="skill-set-button"
                startIcon={<span className="skillset-icon" data-id={id} />}
              >
                {name}
              </Button>
            );
          })}
        </div>}
        {(skillsetId > 0 && !selectingSkillset) &&
        <div className="skill-list-container">
          <Typography variant="overline" className="skill-list-title">Combat</Typography>
          <div className="skill-list combat">
            {basicSkills.map((skillId, index) => {
              // overwrite a skill with ancestral variant
              const variants = ancestralSkills.filter(s => s.ancestralParentId === skillId).sort(sortBy('ancestralElement'));
              if (variants.length) {
                const ancIndex = (variants[0].ancestralLevel - 1) / 3;
                const ancestralId = selAncestrals[ancIndex];
                if (ancestralId > 0 && variants[ancestralId - 1]) {
                  skillId = variants[ancestralId - 1].id;
                }
              }
              // skill icon
              return (
                <div className="skill-container" data-col={(index % 4) + 1} key={skillId}>
                  <Skill
                    id={skillId}
                    onClick={() => setSkill(treeId, index, !selSkills[index])}
                    learned={Boolean(selSkills[index])}
                    spentPoints={spentPoints}
                    remainingPoints={remainingPoints}
                  />
                </div>);
            })}
          </div>
          <Typography variant="overline" className="skill-list-title">Passive</Typography>
          <div className="skill-list passive">
            {passiveSkills.map((passiveId, index) => (
              <div className="skill-container" data-col={(index % 4) + 1} key={passiveId}>
                <Skill
                  id={passiveId}
                  learned={(spentPoints >= pathOr(0, [passiveId, 'requiredLevel'])(skills))}
                />
              </div>),
            )}
          </div>
          <Typography variant="overline" className="skill-list-title">Ancestral</Typography>
          <div className="ancestral-list">
            {ancestralSkills.length === 0 &&
            <Typography variant="overline" style={{ textAlign: 'center' }}>No ancestrals.</Typography>}
            {Array.from(new Set(ancestralSkills.map(s => s.ancestralLevel)))
            .filter(l => l !== undefined)
            .map((aLevel, ancestralId) => {
              const ancestrals = ancestralSkills.filter(s => s.ancestralLevel === aLevel);
              const original = ancestrals.length && basicSkills.map(id => skills[id] || {}).find(s => s.id === ancestrals[0].ancestralParentId);
              const selected = selAncestrals[ancestralId];
              return (
                <div className="ancestral-row" key={`ancestral-${skillsetId}-${aLevel}`}>
                  <div className="ancestral-level">
                    <span className="dropdown-icon Ancestral" />
                    <Typography variant="subtitle1">{aLevel}</Typography>
                  </div>
                  <div className="ancestral-options">
                    <Skill
                      id={original.id}
                      ancestral
                      onClick={() => setAncestral(treeId, ancestralId, 0)}
                      learned={!selected || selected === 0}
                      spentPoints={spentPoints}
                    />
                    {ancestrals.sort(sortBy('ancestralElement')).map((ancSkill, index) => (
                      <Skill
                        key={`anc-${ancSkill.id}`}
                        id={ancSkill.id}
                        ancestral
                        onClick={() => setAncestral(treeId, ancestralId, index + 1)}
                        learned={selected === index + 1}
                        spentPoints={spentPoints}
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

const mapStateToProps = ({ gameData: { skillsets, skills } }) => ({
  skillsets,
  skills,
});

export default connect(mapStateToProps, null)(SkillTree);
