import {
  AppBar,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  addCrop,
  removeCrop,
  restartCrop,
} from 'actions/crops';
import { fetchCropItems } from 'actions/gameData';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import Item from 'components/Item';
import {
  CLIMATE_REGEX,
  CROP_GROUP,
  HARVEST_REGEX,
  MATURES_REGEX,
  TIMER_TYPE,
} from 'constants/crops';
import { CLIMATE } from 'constants/map';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
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

  addCrop = () => {
    const { dd, hh, mm, ss, climate, crop, note, seedbed, timer } = this.state;
    const errors = {};
    if (!objectHasProperties(crop)) {
      errors.crop = 'Crop is required.';
    }
    if (climate.length === 0 && !seedbed) {
      errors.climate = 'A climate is required.';
    }
    if (objectHasProperties(errors)) {
      this.setState({ errors });
      return;
    }
    const maturesVal = crop.description.match(MATURES_REGEX);
    const harvestVal = crop.description.match(HARVEST_REGEX);
    const cropClimate = crop.description.match(CLIMATE_REGEX);
    const enteredTime = toSeconds(dd || 0, hh || 0, mm || 0, ss || 0);
    let defaultTime = timer === TIMER_TYPE.HARVEST && harvestVal
      ? toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0)
      : toSeconds(maturesVal[1] || 0, maturesVal[2] || 0, maturesVal[3] || 0, maturesVal[4] || 0);
    if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
      defaultTime = Math.ceil(defaultTime * 0.7);
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

  reharvestCrop = (index, { crop, climate, seedbed }) => {
    const harvestVal = crop.description.match(HARVEST_REGEX);
    const cropClimate = crop.description.match(CLIMATE_REGEX);
    let time = toSeconds(harvestVal[2] || 0, harvestVal[3] || 0, harvestVal[4] || 0, harvestVal[5] || 0);
    if (cropClimate && (climate.includes(cropClimate[1]) || (crop.type === 'Seed' && seedbed))) {
      time = Math.ceil(time * 0.7);
    }
    const ready = moment().add(time, 'seconds');
    this.props.restartCrop(index, ready.valueOf(), TIMER_TYPE.HARVEST);
  };

  render() {
    const { mobile, crops, removeCrop, items } = this.props;
    const { dd, hh, mm, ss, climate, crop, note, timer, seedbed, errors } = this.state;

    setTitle('Crop Timers');

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Crop Timer</Typography>
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
                    label={`Find a crop`}
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
                <FormControlLabel value={TIMER_TYPE.MATURES} control={<Radio size="small" />} label="Matures" />
                <FormControlLabel
                  value={TIMER_TYPE.HARVEST}
                  control={<Radio size="small" />}
                  label="Harvest"
                  disabled={!crop.description || !crop.description.match(HARVEST_REGEX)}
                />
              </RadioGroup>
            </FormControl>
            <FormControl className="select-group" error={hasProperty(errors, 'climate')}>
              <InputLabel className="group-label" shrink>Climate(s)</InputLabel>
              <ButtonGroup color="secondary">
                {Object.values(CLIMATE).map(c => (
                  <Tooltip title={c} key={c}>
                    <Button
                      variant={climate.includes(c) && !seedbed ? 'contained' : 'outlined'}
                      className={cn({ selected: climate.includes(c) })}
                      onClick={(e) => this.handleSelectClimate(e, c)}
                      disabled={seedbed}
                    >
                      <span className={cn('climate-icon small', c)} />
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
                />
              </div>
              <Typography variant="overline" style={{ fontSize: 10 }}>Leave blank for default times.</Typography>
            </FormControl>
            <TextField
              className="ts-select"
              label="Note (optional)"
              value={note}
              onChange={this.changeNote}
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

const mapStateToProps = ({ display: { mobile }, crops: myCrops, gameData: { crops, items } }) => {
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
    } else {
      item.group = CROP_GROUP[1];
    }
  });
  const itemMap = arrayToMap(cropItems);
  return {
    mobile,
    crops: myCrops.map(crop => ({ ...crop, crop: itemMap[crop.crop] })),
    items: cropItems.sort((a, b) => CROP_GROUP.indexOf(a.group) - CROP_GROUP.indexOf(b.group)),
  };
};

const mapDispatchToProps = {
  addCrop,
  removeCrop,
  fetchCropItems,
  restartCrop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Crops);
