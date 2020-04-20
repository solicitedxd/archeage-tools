import {
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import cn from 'classnames';
import TREE from 'data/trees';
import moment from 'moment';
import React, { Component } from 'react';
import {
  func,
  number,
  string,
} from 'react-proptypes';
import {
  hhmmssFromDate,
  timeFormat,
  toSeconds,
} from 'utils/thunderstruck';

class TreeCard extends Component {
  static propTypes = {
    tree: string.isRequired,
    time: number.isRequired,
    climate: string.isRequired,
    onDelete: func,
    note: string,
  };

  static defaultProps = {
    note: '',
    onDelete: () => {
    },
  };

  state = {
    currentTime: '',
  };

  timer = null;

  componentDidMount() {
    this.timer = setInterval(this.doTick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  doTick = () => {
    this.setState({ currentTime: new Date() });
  };

  render() {
    const { tree, time, climate, note, onDelete } = this.props;

    const treeObj = TREE.find((row) => row.name === tree);

    let totalTime = toSeconds(treeObj.matures);
    if (treeObj.climate && treeObj.climate === climate) {
      totalTime = Math.ceil(totalTime * 0.7);
    }
    const now = moment();
    const complete = moment(time);
    const completeTimer = complete.isAfter(now) ? hhmmssFromDate(complete.diff(now)) : complete.fromNow();
    const planted = moment(complete).subtract(totalTime, 'seconds');
    const stage1 = moment(planted).add(totalTime * 0.1, 'seconds');
    const stage1Timer = stage1.isAfter(now) ? hhmmssFromDate(stage1.diff(now)) : stage1.fromNow();
    const stage2 = moment(planted).add(totalTime * 0.5, 'seconds');
    const stage2Timer = stage2.isAfter(now) ? hhmmssFromDate(stage2.diff(now)) : stage2.fromNow();

    return (
      <Paper className={cn('thunderstruck-tree', { complete: complete.isBefore(now) })}>
        <div className="tree-name">
          <Typography variant="h6">{tree}</Typography>
          {note && <Typography variant="subtitle1" className="tree-note">{note}</Typography>}
        </div>
        <div className={cn('tree-time', { passed: stage1.isBefore(now) })}>
          <Typography variant="caption" className="tree-note">Phase 1</Typography>
          <Typography>{stage1.format(timeFormat)}</Typography>
          <Typography variant="subtitle2">{stage1Timer}</Typography>
        </div>
        <div className={cn('tree-time', { passed: stage2.isBefore(now) })}>
          <Typography variant="caption" className="tree-note">Phase 2</Typography>
          <Typography>{stage2.format(timeFormat)}</Typography>
          <Typography variant="subtitle2">{stage2Timer}</Typography>
        </div>
        <div className={cn('tree-time', { passed: complete.isBefore(now) })}>
          <Typography variant="caption" className="tree-note">Complete</Typography>
          <Typography>{complete.format(timeFormat)}</Typography>
          <Typography variant="subtitle2">{completeTimer}</Typography>
        </div>
        <div className="tree-delete">
          <Tooltip title="Delete this timer.">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    );
  }
}

export default TreeCard;
