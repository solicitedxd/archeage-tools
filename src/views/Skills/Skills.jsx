import {
  AppBar,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import { Autocomplete } from '@material-ui/lab';
import {
  fetchSkillsets,
  findClassName,
} from 'actions/gameData';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import {
  DEFAULT_ANCESTRALS,
  DEFAULT_SKILLS,
  MAX_POINTS,
} from 'constants/skills';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { objectHasProperties } from 'utils/object';
import {
  decodeSkillString,
  defaultSkillset,
  encodeSkillsets,
  getPointReq,
  getTreePoints,
  legacyDecodeSkillString,
} from 'utils/skills';
import { setTitle } from 'utils/string';
import SkillTree from './SkillTree';

class Skills extends Component {
  static propTypes = {
    fetchSkillsets: func.isRequired,
    findClassName: func.isRequired,
    location: object,
    skillsets: object,
    mobile: bool,
    classes: string,
  };

  state = {
    skillsets: [
      defaultSkillset(),
      defaultSkillset(),
      defaultSkillset(),
    ],
    updateId: null,
  };

  componentDidMount() {
    this.props.fetchSkillsets();
  }

  loadBuild = (props) => {
    const { location } = props;
    if (location.hash && location.hash.length > 0) {
      const dataString = location.hash.substr(1);
      const isLegacy = dataString.includes('.') || dataString.includes(',');
      const skillsets = isLegacy ? legacyDecodeSkillString(dataString) : decodeSkillString(dataString);
      if (isLegacy) {
        this.updateHash(skillsets);
      }
      if (!equals(skillsets, this.state.skillsets)) {
        this.setState({ skillsets });
      }
    } else {
      this.setState({ skillsets: decodeSkillString('') });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash || objectHasProperties(nextProps.skillsets) !== objectHasProperties(this.props.skillsets)) {
      this.loadBuild(nextProps);
    }
  }

  setSkillTree = (treeId, id) => {
    const { skillsets: skillTreesOld } = this.state;
    const skillsets = [...skillTreesOld];
    skillsets[treeId] = { id, skills: DEFAULT_SKILLS, ancestrals: [] };
    this.updateHash(skillsets);
  };

  setSkill = (setId, skillIndex, value) => {
    const { skillsets: skillTreesOld } = this.state;
    const skillsets = [...skillTreesOld];
    const skills = [...skillsets[setId].skills];

    const remainingPoints = MAX_POINTS - this.getSpentPoints();
    const spentPoints = getTreePoints(skills);
    const currentValue = Boolean(skills[skillIndex]);

    // no change, do nothing
    if (value === currentValue) return;

    // validate the change
    if (value === true) {
      // no points available, do nothing
      if (remainingPoints === 0) return;
      // not enough points spent to unlock
      if (spentPoints < getPointReq(skillIndex * 5)) return;
    } else {
      // can't take points out of skills if it would lock out a learned skill
      if (skillIndex !== 11 && Boolean(skills[11]) && getPointReq(55) > spentPoints - 2) return;
      if (skillIndex !== 7 && Boolean(skills[7]) && getPointReq(35) > spentPoints - 2) return;
      if (skillIndex !== 3 && Boolean(skills[3]) && getPointReq(15) > spentPoints - 2) return;
    }

    skills[skillIndex] = value === true ? 1 : 0;
    skillsets[setId].skills = skills;
    this.updateHash(skillsets);
  };

  setAncestral = (setId, ancestralId, ancestralIndex) => {
    const { skillsets: oldSkillsets } = this.state;
    const skillsets = [...oldSkillsets];
    const ancestrals = [...skillsets[setId].ancestrals];

    ancestrals[ancestralId] = ancestralIndex;
    skillsets[setId].ancestrals = ancestrals;
    this.updateHash(skillsets);
  };

  resetSkillTree = (setId) => {
    const { skillsets } = this.state;
    this.setSkillTree(setId, skillsets[setId].id);
  };

  selectAllTrees = (trees) => {
    this.updateHash([
      { id: trees[0], skills: DEFAULT_SKILLS, ancestrals: DEFAULT_ANCESTRALS },
      { id: trees[1], skills: DEFAULT_SKILLS, ancestrals: DEFAULT_ANCESTRALS },
      { id: trees[2], skills: DEFAULT_SKILLS, ancestrals: DEFAULT_ANCESTRALS },
    ]);
  };

  resetAllTrees = () => {
    const { skillsets } = this.state;
    this.selectAllTrees(skillsets.map(tree => tree.id));
  };

  getSpentPoints = () => {
    return this.getTreePoints().reduce((a, b) => a + b);
  };

  getTreePoints = () => {
    return this.state.skillsets.map(tree => getTreePoints(tree.skills));
  };

  updateHash = (skillsets) => {
    window.location.hash = '#' + encodeSkillsets(skillsets);
  };

  handleSelectClass = (_, c) => {
    this.selectAllTrees(c.skillsetIds);
  };

  handleUpdate = (skillId) => {
    // eslint-disable-next-line no-undef
    if (__DEVELOPMENT__) {
      this.setState({ updateId: skillId });
    }
  };

  render() {
    const { skillsets } = this.state;
    const { mobile, findClassName, classes, skillsets: skillsetData } = this.props;

    let className;
    const selectedSkillsets = skillsets.map(sks => sks.id);
    if (skillsets.every(sks => Boolean(sks.id))) {
      className = findClassName(selectedSkillsets);
    }

    const spentPoints = this.getSpentPoints();
    const remainingPoints = MAX_POINTS - spentPoints;
    const skillsetPoints = this.getTreePoints();

    if (className) {
      setTitle(`${className} Build (${skillsetPoints.join('/')})`);
    } else {
      const skillsetNames = selectedSkillsets.filter(id => Boolean(id)).map(id => skillsetData[id].name);
      if (skillsetNames.length > 0) {
        setTitle(`${skillsetNames.join('/')} Build (${skillsetPoints.splice(0, skillsetNames.length).join('/')})`);
      } else {
        setTitle('Skill Calculator');
      }
    }

    return (
      <div className="skills-container">
        <div className="skills-header">
          <Paper className="section">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5">
                  Skill Builder:
                </Typography>
                <Autocomplete
                  className="title-text class-select color-white"
                  autoHighlight
                  disableClearable
                  blurOnSelect
                  size="small"
                  loading={!objectHasProperties(classes)}
                  options={classes}
                  onChange={this.handleSelectClass}
                  value={{ name: className, skillsetIds: selectedSkillsets }}
                  getOptionLabel={option => option.name || ''}
                  renderOption={option => (
                    <div className="class-result" key={`class-${option.name}`}>
                      <div className="skillset-icons">
                        {option.skillsetIds.sort((a, b) => a - b).map(id => (
                          <span className="skillset-icon" data-id={id} key={`${option.name}-${id}`} />
                        ))}
                      </div>
                      <Typography variant="body2">{option.name}</Typography>
                    </div>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={`Find a class`}
                      variant="standard"
                      size="medium"
                      margin="none"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                      }}
                    />
                  )}
                />
                <Typography variant="subtitle2">{spentPoints}/{MAX_POINTS}</Typography>
                <Tooltip title="Reset All Trees">
                  <IconButton color="inherit" aria-label="Reset" onClick={this.resetAllTrees}>
                    <ReplayIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
          </Paper>
        </div>
        <div className={cn('section', 'skill-trees', { mobile })}>
          {[0, 1, 2].map(treeId =>
            <SkillTree
              treeId={treeId}
              key={`tree-${treeId}`}
              setSkillTree={this.setSkillTree}
              setSkill={this.setSkill}
              setAncestral={this.setAncestral}
              resetSkillTree={this.resetSkillTree}
              treeData={skillsets[treeId]}
              remainingPoints={remainingPoints}
              selectedSkillset={selectedSkillsets}
            />,
          )}
        </div>
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, gameData: { skillsets, classes } }) => ({
  mobile,
  skillsets,
  classes,
});

const mapDispatchToProps = {
  findClassName,
  fetchSkillsets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
