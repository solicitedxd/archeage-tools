import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import cn from 'classnames';
import ItemLink from 'components/Item/ItemLink';
import {
  CLIMATE_REGEX,
  CROP_CUSTOM,
  HARVEST_REGEX,
  MATURES_REGEX,
  TIME_FORMAT,
  TIMER_TYPE,
} from 'constants/crops';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import {
  hhmmssFromDate,
  toSeconds,
} from 'utils/time';

class CropTimer extends Component {
  static propTypes = {
    crop: object,
    time: number.isRequired,
    climate: array.isRequired,
    onDelete: func,
    onRestart: func,
    onMark: func,
    timer: string.isRequired,
    seedbed: bool.isRequired,
    note: string,
    mark: bool,
  };

  static defaultProps = {
    note: '',
    'onDelete': () => {
    },
    'onRestart': () => {
    },
    mark: false,
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

  // eslint-disable-next-line complexity
  render() {
    const { crop, time, climate, note, timer, seedbed, mark, onDelete, onRestart, onMark } = this.props;

    if (!crop) return null;

    const now = moment();
    const complete = moment(time);

    let totalTime;
    let restart;
    let phase1 = 0.1;
    let phase1Name = 'Phase 1';
    let phase2 = 0.5;
    let phase2Name = 'Phase 2';
    let completeName = timer === TIMER_TYPE.HARVEST ? 'Harvest' : 'Mature';
    let showPhase = crop.type === 'Saplings' && timer === TIMER_TYPE.MATURES;
    const customData = pathOr(null, [crop.id, timer])(CROP_CUSTOM);
    if (customData) {
      totalTime = customData.time;
      restart = customData.restart || false;
      if (customData.phase1) {
        phase1 = customData.phase1;
        phase1Name = customData.phase1Name || phase1Name;
      }
      if (customData.phase2) {
        phase2 = customData.phase2;
        phase2Name = customData.phase2Name || phase2Name;
      }
      if (customData.showPhase !== undefined) {
        showPhase = customData.showPhase;
      }
      if (customData.completeName) {
        completeName = customData.completeName;
      }
    } else {
      const maturesVal = crop.description.match(MATURES_REGEX);
      const harvestVal = crop.description.match(HARVEST_REGEX);
      const cropClimate = crop.description.match(CLIMATE_REGEX);
      totalTime = timer === TIMER_TYPE.HARVEST && harvestVal
        ? toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0)
        : toSeconds(maturesVal[1] || 0, maturesVal[2] || 0, maturesVal[3] || 0, maturesVal[4] || 0);
      if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
        totalTime = Math.ceil(totalTime * 0.7);
      }
      restart = harvestVal && complete.isBefore(now);
    }
    const completeTimer = complete.isAfter(now) ? hhmmssFromDate(complete.diff(now)) : complete.fromNow();
    const planted = moment(complete).subtract(totalTime, 'seconds');
    const stage1 = moment(planted).add(totalTime * phase1, 'seconds');
    const stage1Timer = stage1.isAfter(now) ? hhmmssFromDate(stage1.diff(now)) : stage1.fromNow();
    const stage2 = moment(planted).add(totalTime * phase2, 'seconds');
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
          {showPhase &&
          <div className={cn('crop-time', { passed: stage1.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">{phase1Name}</Typography>
            <Typography>{stage1.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{stage1Timer}</Typography>
          </div>}
        </TableCell>
        <TableCell>
          {showPhase &&
          <div className={cn('crop-time', { passed: stage2.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">{phase2Name}</Typography>
            <Typography>{stage2.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{stage2Timer}</Typography>
          </div>}
        </TableCell>
        <TableCell>
          <div className={cn('crop-time', { passed: complete.isBefore(now) })}>
            <Typography variant="caption" className="crop-note">
              {completeName}
            </Typography>
            <Typography>{complete.format(TIME_FORMAT)}</Typography>
            <Typography variant="subtitle2">{completeTimer}</Typography>
          </div>
        </TableCell>
        <TableCell className="crop-delete">
          {customData && customData.mark &&
          <>
            <Tooltip title={`Toggle ${customData.mark.name}`}>
              <IconButton onClick={() => onMark(!mark)}>
                {React.createElement(mark ? customData.mark.on : customData.mark.off)}
              </IconButton>
            </Tooltip>
          </>}
          {restart &&
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
