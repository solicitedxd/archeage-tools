import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import cn from 'classnames';
import ItemLink from 'components/Item/ItemLink';
import {
  CLIMATE_REGEX,
  HARVEST_REGEX,
  MATURES_REGEX,
  TIME_FORMAT,
  TIMER_TYPE,
} from 'constants/crops';
import moment from 'moment';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  string,
} from 'react-proptypes';
import {
  hhmmssFromDate,
  toSeconds,
} from 'utils/time';

class CropTimer extends Component {
  static propTypes = {
    crop: string.isRequired,
    time: number.isRequired,
    climate: string.isRequired,
    onDelete: func,
    onRestart: func,
    timer: string.isRequired,
    seedbed: bool.isRequired,
    note: string,
  };

  static defaultProps = {
    note: '',
    'onDelete': () => {
    },
    'onRestart': () => {
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
    const { crop, time, climate, note, timer, seedbed, onDelete, onRestart } = this.props;

    if (!crop) return null;

    const maturesVal = crop.description.match(MATURES_REGEX);
    const harvestVal = crop.description.match(HARVEST_REGEX);
    const cropClimate = crop.description.match(CLIMATE_REGEX);
    const harvestTime = harvestVal && toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0);
    let totalTime = timer === TIMER_TYPE.HARVEST && harvestVal
      ? harvestTime
      : toSeconds(maturesVal[1] || 0, maturesVal[2] || 0, maturesVal[3] || 0, maturesVal[4] || 0);
    if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
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
      <TableRow className={cn('crop-timer', { complete: complete.isBefore(now) })}>
        <TableCell>
          <div className="crop-name">
            <Typography variant="h6">
              <ItemLink name="" id={crop.id} />
              {crop.name}
              <span className="climate-icons">
                {!seedbed && climate.map(c => (
                  <span className={cn('climate-icon small', c)} key={`${crop.id}-c`} />
                ))}
                {seedbed &&
                <span className="climate-icon small Seedbed" />}
              </span>
            </Typography>
            {note && <Typography variant="subtitle1" className="crop-note">{note}</Typography>}
          </div>
        </TableCell>
        <TableCell>
          {crop.type === 'Saplings' && timer === TIMER_TYPE.MATURES &&
          <div className={cn('crop-time', { passed: stage1.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">Phase 1</Typography>
            <Typography>{stage1.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{stage1Timer}</Typography>
          </div>}
        </TableCell>
        <TableCell>
          {crop.type === 'Saplings' && timer === TIMER_TYPE.MATURES &&
          <div className={cn('crop-time', { passed: stage2.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">Phase 2</Typography>
            <Typography>{stage2.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{stage2Timer}</Typography>
          </div>}
        </TableCell>
        <TableCell>
          <div className={cn('crop-time', { passed: complete.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">
              {timer === TIMER_TYPE.HARVEST ? 'Harvest' : 'Mature'}
            </Typography>
            <Typography>{complete.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{completeTimer}</Typography>
          </div>
        </TableCell>
        <TableCell className="crop-delete">
          {harvestTime && complete.isBefore(now) &&
          <Tooltip title="Restart timer with Harvest time.">
            <IconButton onClick={onRestart}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Delete this timer.">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  }
}

export default CropTimer;
