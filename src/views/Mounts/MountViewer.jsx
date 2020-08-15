import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Link from 'components/Link';
import SkillIcon from 'components/Skill/SkillIcon';
import MOUNT from 'data/mounts';
import NoPortrait from 'images/NoPortrait.png';
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
  pascalCase,
  setTitle,
  slug,
} from 'utils/string';
import * as Portrait from '../../images/mount';

class MountViewer extends Component {
  static propTypes = {
    id: string,
    onClose: func.isRequired,
    mountData: object,
    obtainTypes: object,
    mobile: bool,
  };

  static defaultProps = {
    id: null,
  };

  state = {
    id: null,
    open: false,
  };

  componentDidMount() {
    const { id, mountData } = this.props;
    if (id && objectHasProperties(mountData)) {
      this.loadMount(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id, mountData } = this.props;
    // detect change in loaded id
    if (id && objectHasProperties(mountData) && ((!prevProps.id || id !== prevProps.id) || !objectHasProperties(prevProps.mountData))) {
      this.loadMount(id);
    }
  }

  loadMount(id) {
    const { mountData } = this.props;
    const mount = mountData[id];
    if (!mount) {
      this.onClose();
    } else {
      setTitle(mount[0].name);
      this.setState({ id, open: true });
    }
  }

  onClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { id, open } = this.state;
    const { mobile, mountData, obtainTypes } = this.props;

    const mountSet = mountData[id];
    const mountObtain = MOUNT.find(mount => slug(mount.name) === id);
    if (!mountSet) return null;

    const [mount, ...altMounts] = mountSet;

    const altSkills = Array.from(new Set(altMounts.map(altMount => altMount.skillIds).filter(s => !equals(s, mount.skillIds)).map(JSON.stringify)), JSON.parse);

    return (
      <Dialog
        open={open}
        onClose={this.onClose}
        maxWidth="lg"
        fullScreen={mobile}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">
              <div className="mount-header-icon" data-grade={mount.gradeId}>
                <img src={`/images/icon/${mount.icon}.png`} alt={mount.name} />
              </div>
              {mount.name}
            </Typography>
            <Tooltip title="Close">
              <IconButton onClick={this.onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent className={cn('mount-viewer', mobile)}>
          <div className="info">
            <div className="portrait">
              <img src={Portrait[pascalCase(mount.name)] || NoPortrait} alt={mount.name} />
              <div className="left-stats">
                <Typography component="div" className="obtainables">
                  {mount.obtainIds && mount.obtainIds.length > 0
                    ? mount.obtainIds.map(obtainId => (
                      <Tooltip
                        title={`Obtainable with ${obtainTypes[obtainId].name}`}
                        key={`view-obt-${mount.id}-${obtainId}`}
                      >
                        <span className={cn('dropdown-icon', obtainTypes[obtainId].icon)} />
                      </Tooltip>
                    ))
                    : 'Unobtainable'}
                </Typography>
                {mountObtain && mountObtain.upgrade &&
                <Typography className="upgrade">
                  Upgrade: <Link to={`/mounts/${slug(mountObtain.upgrade)}`}>{mountObtain.upgrade}</Link>
                </Typography>}
              </div>
              <div className="right-stats">
                <Tooltip title="Base Move Speed">
                  <Typography className="move-speed">{mount.moveSpeed || '?'} m/s</Typography>
                </Tooltip>
                {mount.imageCredit &&
                <Typography className="image-credit">
                  Image: {mount.imageCredit}
                </Typography>}
              </div>
            </div>
            <Typography variant="h6" className="skill-header">
              <span>Skills</span>
              <Tooltip title="Base Level">
                <Typography variant="caption">Lv. {mount.level}</Typography>
              </Tooltip>
            </Typography>
            <div className="skills">
              {mount.skillIds.map(skillId => (
                <SkillIcon key={`viewer-${mount.id}-${skillId}`} id={skillId} />
              ))}
            </div>
            {altSkills.length > 0 &&
            <>
              <Tooltip
                title="There's a possible, alternate variant of this mount that offers a different selection of skills.">
                <Typography>Alternate Skills</Typography>
              </Tooltip>
              {altSkills.map(skillIds => {
                const altMount = altMounts.find(m => equals(m.skillIds, skillIds));
                return (
                  <div className="skills" key={`alt-mount-${altMount.id}`}>
                    <Tooltip title="Base Level">
                      <Typography variant="caption" className="skill-alt">
                        Lv. {mount.level}
                      </Typography>
                    </Tooltip>
                    {skillIds.map(skillId => (
                      <SkillIcon key={`viewer-${altMount.id}-${skillId}`} id={skillId} className="size-sm" />
                    ))}
                    {altMount.alternateNote &&
                    <Typography variant="caption" className="skill-alt-note">{altMount.alternateNote}</Typography>}
                  </div>
                );
              })}
            </>}
          </div>
          <div className="obtain">
            {mount.quote &&
            <blockquote>{mount.quote}</blockquote>}
            <Typography variant="h6">
              Getting {mount.name}
              {mountObtain && mountObtain.itemName &&
              <Typography component="span"> ({mountObtain.itemName})</Typography>}
            </Typography>
            {/* eslint-disable-next-line no-nested-ternary */}
            {((!mount.obtainIds || mount.obtainIds.length === 0) && !(mountObtain && mountObtain.obtainText))
              ? <Typography className="alert-red">This mount is currently unavailable.</Typography>
              : mountObtain && mountObtain.obtainText
                ? <Typography component="div">{mountObtain.obtainText}</Typography>
                : <Typography component="div">Details to obtain this mount have not yet been added.</Typography>}
          </div>
        </DialogContent>
        <AdContainer section={false} type="horizontal" />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, gameData: { mounts: { mounts, obtainTypes } } }) => ({
  mobile,
  mountData: mounts,
  obtainTypes,
});

export default connect(mapStateToProps, null)(MountViewer);
