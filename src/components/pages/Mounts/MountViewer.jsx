import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import cn from 'classnames';
import Link from 'components/Link';
import SkillIcon from 'components/Skill/SkillIcon';
import MOUNT from 'data/mounts';
import NoPortrait from 'images/NoPortrait.png';
import React, { Component } from 'react';
import {
  func,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  pascalCase,
  slug,
} from 'utils/string';
import * as Portrait from '../../../images/mount/';

class MountViewer extends Component {
  static propTypes = {
    id: string,
    onClose: func.isRequired,
  };

  static defaultProps = {
    id: null,
  };

  state = {
    id: null,
    open: false,
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.loadMount(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    // detect change in loaded id
    if (id && (!prevProps.id || id !== prevProps.id)) {
      this.loadMount(id);
    }
  }

  loadMount(id) {
    const mount = MOUNT.find(mount => slug(mount.name) === id);
    if (!mount) {
      this.onClose();
    } else {
      this.setState({ id, open: true });
    }
  }

  onClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { id, open } = this.state;
    const { mobile } = this.props;

    const mount = MOUNT.find(mount => slug(mount.name) === id);
    if (!mount) return null;

    return (
      <Dialog
        open={open}
        onClose={this.onClose}
        maxWidth="lg"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{mount.name}</Typography>
            <Tooltip title="Close">
              <IconButton onClick={this.onClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent className={cn('mount-viewer', mobile)}>
          <div className="info">
            <img src={Portrait[pascalCase(mount.name)] || NoPortrait} alt={mount.name} className="portrait" />
            <div className="obtainables">
              <Typography color="primary" component="span">Obtain with: </Typography>
              {mount.obtainable && mount.obtainable.length > 0
                ? mount.obtainable.map(obtainBy => (
                  <Tooltip title={obtainBy} key={`${pascalCase(mount.name)}-${obtainBy}`}>
                    <span className={cn('dropdown-icon', obtainBy)} />
                  </Tooltip>
                ))
                : <Typography component="span">Unobtainable</Typography>}
            </div>
            <Typography className="speed">
              <Typography color="primary" component="span">Base Move Speed: </Typography>
              {mount.speed} m/s
            </Typography>
            {mount.upgrade &&
            <Typography>
              Upgrade: <Link to={`/mounts/${slug(mount.upgrade)}`}>{mount.upgrade}</Link>
            </Typography>
            }
            <Typography variant="h6">Skills</Typography>
            <div className="skills">
              {mount.skills.map(skill => {
                const id = Array.isArray(skill) ? skill[0] : null;
                const name = !id ? skill : null;
                return (
                  <SkillIcon key={id || name} skillset="Basic" id={id} name={name} />
                );
              })}
            </div>
          </div>
          <div className="obtain">
            {mount.quote &&
            <blockquote>{mount.quote}</blockquote>}
            <Typography variant="h6">Getting a {mount.name}</Typography>
            {(!mount.obtainable || mount.obtainable.length === 0) &&
            <Typography className="alert-red">This mount is currently unavailable.</Typography>}
            {mount.obtainText &&
            <Typography component="div">{mount.obtainText}</Typography>}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

export default connect(mapStateToProps, null)(MountViewer);
