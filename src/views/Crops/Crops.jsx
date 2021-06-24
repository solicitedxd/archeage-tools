import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import {
  addCrop,
  markCrop,
  removeCrop,
  restartCrop,
} from 'actions/crops';
import {
  fetchClimates,
  fetchCropItems,
} from 'actions/gameData';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Item from 'components/Item';
import {
  CLIMATE_REGEX,
  CROP_CUSTOM,
  CROP_GROUP,
  HARVEST_REGEX,
  MATURES_REGEX,
  TIMER_TYPE,
} from 'constants/crops';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  arrayToMap,
  sortBy,
  toggleValue,
} from 'utils/array';
import {
  hasProperty,
  objectHasProperties,
} from 'utils/object';
import { setTitle } from 'utils/string';
import { toSeconds } from 'utils/time';
import CropTimer from './CropTimer';

class Crops extends Component {
  static propTypes = {
    fetchCropItems: func.isRequired,
    addCrop: func.isRequired,
    restartCrop: func.isRequired,
    removeCrop: func.isRequired,
    mobile: bool.isRequired,
    crops: array.isRequired,
    items: array.isRequired,
    fetchClimates: func.isRequired,
    climates: object.isRequired,
    markCrop: func.isRequired,
  };

  state = {
    dd: '',
    hh: '',
    mm: '',
    ss: '',
    climate: [],
    crop: {},
    note: '',
    timer: TIMER_TYPE.MATURES,
    seedbed: false,
    errors: {},
  };

  dd = React.createRef();

  hh = React.createRef();

  mm = React.createRef();

  ss = React.createRef();

  timeFields = { dd: this.dd, hh: this.hh, mm: this.mm, ss: this.ss };

  componentDidMount() {
    this.props.fetchCropItems();
    this.props.fetchClimates();
  }

  handleTimeChange = (key) => (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value !== '') {
      const num = Number.parseInt(value);
      let max = 59;
      if (key === 'hh') {
        max = 24;
      }
      value = Math.min(num, max);
    }

    // select the next element when this one is full
    const curSize = String(value).length;
    const maxSize = key === 'dd' ? 1 : 2;
    if (curSize === maxSize) {
      const curIndex = Object.keys(this.timeFields).indexOf(key);
      // last field, do nothing
      if (curIndex !== Object.keys(this.timeFields).length - 1) {
        const nextRef = Object.values(this.timeFields)[curIndex + 1];
        nextRef.current.select();
      }
    }

    this.setState({ [key]: value !== '' ? Number.parseInt(value) : '' });
  };

  handleSelectClimate = (e, c) => {
    const climate = [...this.state.climate];
    toggleValue(climate, c);
    this.setState({ climate });
  };

  handleSelectCrop = (e, crop) => {
    let { seedbed, timer } = this.state;
    if (crop.type !== 'Seed' && seedbed) {
      seedbed = false;
    }
    if (!crop.description.match(HARVEST_REGEX) && timer === TIMER_TYPE.HARVEST) {
      timer = TIMER_TYPE.MATURES;
    }
    if (CROP_CUSTOM[crop.id]) {
      timer = CROP_CUSTOM[crop.id].types[0];
    }
    this.setState({ crop, seedbed, timer });
  };

  handleTimerChange = (e, timer) => {
    this.setState({ timer });
  };

  handleSeedbedChange = (e, seedbed) => {
    this.setState({ seedbed });
  };

  changeNote = (event) => {
    this.setState({ note: event.target.value });
  };

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.addCrop();
    }
  };

  addCrop = () => {
    const { dd, hh, mm, ss, climate, crop, note, seedbed, timer } = this.state;
    const errors = {};
    if (!objectHasProperties(crop)) {
      errors.crop = 'Crop is required.';
    }
    if (climate.length === 0 && !seedbed && !CROP_CUSTOM[crop.id]) {
      errors.climate = 'A climate is required.';
    }
    if (objectHasProperties(errors)) {
      this.setState({ errors });
      return;
    }
    const enteredTime = toSeconds(dd || 0, hh || 0, mm || 0, ss || 0);
    let defaultTime;
    if (CROP_CUSTOM[crop.id]) {
      defaultTime = CROP_CUSTOM[crop.id][timer].time;
    } else {
      const maturesVal = crop.description.match(MATURES_REGEX);
      const harvestVal = crop.description.match(HARVEST_REGEX);
      const cropClimate = crop.description.match(CLIMATE_REGEX);

      defaultTime = timer === TIMER_TYPE.HARVEST && harvestVal
        ? toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0)
        : toSeconds(maturesVal[1] || 0, maturesVal[2] || 0, maturesVal[3] || 0, maturesVal[4] || 0);
      if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
        defaultTime = Math.ceil(defaultTime * 0.7);
      }
    }
    const timeToTrack = enteredTime > defaultTime || enteredTime === 0 ? defaultTime : enteredTime;
    const ready = moment().add(timeToTrack, 'seconds');

    let noteTrim = note.trim();
    if (noteTrim.length > 100) {
      noteTrim = noteTrim.substr(0, 100);
    }

    this.props.addCrop(crop.id, ready.valueOf(), climate, timer, seedbed, noteTrim);
    this.setState({
      dd: '',
      hh: '',
      mm: '',
      ss: '',
      crop: {},
      note: '',
      timer: TIMER_TYPE.MATURES,
      seedbed: false,
      errors,
    });
  };

  reharvestCrop = (index, { crop, climate, seedbed, timer }) => {
    let time;
    let timerType = TIMER_TYPE.HARVEST;
    if (CROP_CUSTOM[crop.id]) {
      time = CROP_CUSTOM[crop.id][timer].time;
      timerType = timer;
    } else {
      const harvestVal = crop.description.match(HARVEST_REGEX);
      const cropClimate = crop.description.match(CLIMATE_REGEX);
      time = toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0);
      if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
        time = Math.ceil(time * 0.7);
      }
    }
    const ready = moment().add(time, 'seconds');
    this.props.restartCrop(index, ready.valueOf(), timerType);
  };

  setMark = (index) => (mark) => {
    this.props.markCrop(index, mark);
  };

  render() {
    const { mobile, crops, removeCrop, items, climates } = this.props;
    const { dd, hh, mm, ss, climate, crop, note, timer, seedbed, errors } = this.state;

    const cropCustom = CROP_CUSTOM[crop.id];

    setTitle('My Farm Timers');

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">My Farm Timers</Typography>
            </Toolbar>
          </AppBar>
          <div className="crops-container">
            <Autocomplete
              className="crop-select"
              autoHighlight
              disableClearable
              blurOnSelect
              size="small"
              loading={!items.length}
              options={items}
              onChange={this.handleSelectCrop}
              value={crop}
              getOptionLabel={option => option.name || ''}
              renderOption={option => (
                <div className="item-result" key={option.id}>
                  <Item id={option.id} inline />
                  <Typography variant="body2">{option.name}</Typography>
                </div>
              )}
              groupBy={option => option.group}
              renderInput={params => (
                <FormControl error={hasProperty(errors, 'crop')}>
                  <TextField
                    {...params}
                    label={`Find a crop, tree, or livestock`}
                    variant="standard"
                    size="medium"
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
                  {errors.crop && <FormHelperText>{errors.crop}</FormHelperText>}
                </FormControl>
              )}
            />
            <FormControl component="fieldset">
              <FormLabel>Timer</FormLabel>
              <RadioGroup
                name="timer-type"
                value={timer}
                onChange={this.handleTimerChange}
              >
                <FormControlLabel
                  value={TIMER_TYPE.MATURES}
                  control={<Radio size="small" />}
                  label="Matures"
                  disabled={cropCustom && !cropCustom.types.includes(TIMER_TYPE.MATURES)}
                />
                <FormControlLabel
                  value={TIMER_TYPE.HARVEST}
                  control={<Radio size="small" />}
                  label="Harvest"
                  disabled={(!crop.description || !crop.description.match(HARVEST_REGEX)) && !(cropCustom && cropCustom.types.includes(TIMER_TYPE.HARVEST))}
                />
              </RadioGroup>
            </FormControl>
            <FormControl className="select-group" error={hasProperty(errors, 'climate')}>
              <InputLabel className="group-label" shrink>Climate(s)</InputLabel>
              <ButtonGroup color="secondary">
                {Object.values(climates).map(c => (
                  <Tooltip title={c.name} key={`climate-${c.id}`}>
                    <Button
                      variant={climate.includes(c.name) && !seedbed ? 'contained' : 'outlined'}
                      className={cn({ selected: climate.includes(c.name) })}
                      onClick={(e) => this.handleSelectClimate(e, c.name)}
                      disabled={seedbed}
                    >
                      <span className={cn('climate-icon small', c.name)} />
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
              {errors.climate && <FormHelperText>{errors.climate}</FormHelperText>}
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Seedbed?"
                disabled={crop.type !== 'Seed' || crop.name.includes('Bundle')}
                checked={seedbed}
                onChange={this.handleSeedbedChange}
              />
            </FormControl>
            <FormControl className="ts-select">
              <InputLabel shrink>Time Remaining</InputLabel>
              <div className="multi-input">
                <Input
                  id="dd"
                  placeholder="0"
                  endAdornment="d"
                  inputProps={{
                    maxLength: 1,
                    ref: this.dd,
                  }}
                  value={dd}
                  onChange={this.handleTimeChange('dd')}
                  onKeyPress={this.checkEnter}
                />
                <Input
                  id="hh"
                  placeholder="0"
                  endAdornment="h"
                  inputProps={{
                    maxLength: 2,
                    ref: this.hh,
                  }}
                  value={hh}
                  onChange={this.handleTimeChange('hh')}
                  onKeyPress={this.checkEnter}
                />
                <Input
                  id="mm"
                  placeholder="0"
                  endAdornment="m"
                  inputProps={{
                    maxLength: 2,
                    ref: this.mm,
                  }}
                  value={mm}
                  onChange={this.handleTimeChange('mm')}
                  onKeyPress={this.checkEnter}
                />
                <Input
                  id="ss"
                  placeholder="0"
                  endAdornment="s"
                  inputProps={{
                    maxLength: 2,
                    ref: this.ss,
                  }}
                  value={ss}
                  onChange={this.handleTimeChange('ss')}
                  onKeyPress={this.checkEnter}
                />
              </div>
              <Typography variant="overline" style={{ fontSize: 10 }}>Leave blank for default times.</Typography>
            </FormControl>
            <TextField
              className="ts-select"
              label="Note (optional)"
              value={note}
              onChange={this.changeNote}
              onKeyPress={this.checkEnter}
            />
            <FormControl className="ts-track-button">
              <Button color="primary" variant="contained" onClick={this.addCrop}>Track</Button>
            </FormControl>
          </div>
        </Paper>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Timers</Typography>
            </Toolbar>
          </AppBar>
          <Table size="small">
            <TableBody>
              {crops.map((crop, index) => (
                <CropTimer
                  {...crop}
                  key={`crop-${index}`}
                  onDelete={() => removeCrop(index)}
                  onRestart={() => this.reharvestCrop(index, crop)}
                  onMark={this.setMark(index)}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, crops: myCrops, gameData: { crops, items, climates } }) => {
  const cropItems = Object.values(items)
  .filter(item => crops.includes(item.id) && !item.name.match(/(Greenhouse|Unidentified|^Bound|^Topiary Sapling$|.* Cherry Sapling|Cornu|Kelp|Graywisp|Dawnleaf|Wild Ginseng|Yellow Yam|Golden Lamb|Hatching Egg)/i))
  .sort(sortBy('grade'));
  cropItems.forEach(item => {
    if (item.name.match(/(Wood ?lot)/i)) {
      item.group = CROP_GROUP[4];
    } else if (item.name.match(/Bundle/i)) {
      item.group = CROP_GROUP[3];
    } else if (item.type === 'Seed') {
      item.group = CROP_GROUP[0];
    } else if (item.type === 'Livestock') {
      if (item.name.match(/(Cage|Coop|Pen)/i)) {
        item.group = CROP_GROUP[5];
      } else {
        item.group = CROP_GROUP[2];
      }
    } else if (item.type === 'Buildings') {
      item.group = CROP_GROUP[6];
    } else {
      item.group = CROP_GROUP[1];
    }
  });
  const itemMap = arrayToMap(cropItems);
  return {
    mobile,
    crops: myCrops.map(crop => ({ ...crop, crop: itemMap[crop.crop] })),
    items: cropItems.sort((a, b) => CROP_GROUP.indexOf(a.group) - CROP_GROUP.indexOf(b.group)),
    climates,
  };
};

const mapDispatchToProps = {
  addCrop,
  removeCrop,
  fetchCropItems,
  restartCrop,
  fetchClimates,
  markCrop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Crops);
