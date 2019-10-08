import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Close,
  Replay,
  Share,
} from '@material-ui/icons';
import SkillTree from 'components/pages/Skills/SkillTree';
import { MAX_POINTS } from 'constants/skills';
import { findClassName } from 'utils/skills';

class Skills extends Component {
  state = {
    skillTrees: [
      { treeName: null, skills: [] },
      { treeName: null, skills: [] },
      { treeName: null, skills: [] },
    ],
    share: false,
    shareCode: null,
    copied: false,
  };

  loadBuild = (props) => {
    const { location } = props;
    if (location.hash) {
      const dataString = location.hash.substr(1);
      this.setState({ skillTrees: this.decodeSkillTrees(dataString) });
    } else {
      this.setState({ skillTrees: this.decodeSkillTrees('') });
    }
  };

  componentDidMount() {
    this.loadBuild(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash) {
      this.loadBuild(nextProps);
    }
  }

  setSkillTree = (treeId, treeName) => {
    const { skillTrees: skillTreesOld } = this.state;
    const skillTrees = [...skillTreesOld];
    skillTrees[treeId] = { treeName, skills: [] };
    this.setState({ skillTrees });
  };

  setSkill = (treeId, skillId, value) => {
    const { skillTrees: skillTreesOld } = this.state;
    const skillTrees = [...skillTreesOld];
    const { skills } = [...skillTrees[treeId].skills];
    skills[skillId] = value;
    skillTrees[treeId].skills = skills;
    this.setState({ skillTrees });
  };

  resetSkillTree = (treeId) => {
    const { skillTrees } = this.state;
    this.setSkillTree(treeId, skillTrees[treeId].skillTree);
  };

  encodeSkillTrees = () => {
    const { skillTrees } = this.state;
    const treeData = skillTrees.map(tree => `${tree.treeName || ''}${tree.skills ? tree.skills.join(',')
      : ''}`).join('\r');
    return btoa(treeData);
  };

  decodeSkillTrees = (data) => {
    const decodedTrees = atob(data).split('\r').map(rawTree => {
      const [treeName, ...skills] = rawTree.split(',');
      return { treeName, skills };
    });
    while (decodedTrees.length < 3) {
      decodedTrees.push({ treeName: null, skills: [] });
    }
    if (decodedTrees.length > 3) {
      decodedTrees.unshift(decodedTrees.length - 3);
    }
    return decodedTrees;
  };

  handleShare = () => {
    this.setState({ share: true, shareCode: this.encodeSkillTrees(), copied: false });
  };

  handleClose = () => {
    this.setState({ share: false });
  };

  handleCopyShare = () => {
    this.copyTextfield.children[0].select();
    document.execCommand('copy');
    this.setState({ copied: true });
  };

  render() {
    const { skillTrees, share, shareCode, copied } = this.state;
    const { location, mobile } = this.props;

    let className;
    if (skillTrees[0].treeName && skillTrees[1].treeName && skillTrees[2].treeName) {
      className = findClassName(skillTrees[0].treeName, skillTrees[1].treeName, skillTrees[2].treeName);
    }
    const selectedClasses = skillTrees.map(tree => tree.treeName);

    const spentPoints = 0;
    const remainingPoints = MAX_POINTS - spentPoints;

    return (
      <div className="skills-container">
        <div className="skills-header">
          <Paper className="section">
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">Skill
                  Calculator{className && `: ${className}`}</Typography>
                <Typography variant="subtitle2">{spentPoints}/{MAX_POINTS}</Typography>
                <Tooltip title="Reset All Trees">
                  <IconButton color="inherit" aria-label="Reset">
                    <Replay />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share Build" onClick={this.handleShare}>
                  <IconButton color="inherit" aria-label="Share">
                    <Share />
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
              resetSkillTree={this.resetSkillTree}
              skillTree={skillTrees[treeId]}
              remainingPoints={remainingPoints}
              selectedClasses={selectedClasses}
            />,
          )}
        </div>
        <Dialog
          open={share}
          onClose={this.handleClose}
        >
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Share Build</Typography>
              <IconButton color="inherit" aria-label="Close" onClick={this.handleClose}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <TextField
              label="Shareable Link"
              defaultValue={`${window.location.protocol}//${window.location.host}${location.pathname}#${shareCode}`}
              InputProps={{
                readOnly: true,
                ref: (node) => this.copyTextfield = node,
              }}
              fullWidth
              helperText={<span style={{ color: 'green' }}>{copied ? 'Copied!' : ''}</span>}
            />
            <Typography variant="overline" onClick={this.handleCopyShare} style={{ cursor: 'pointer' }}>Copy
              link</Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

export default connect(mapStateToProps, null)(Skills);
