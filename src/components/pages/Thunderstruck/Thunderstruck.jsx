import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import {
  AppBar,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  addTree,
  removeTree,
} from 'actions/thunderstruck';
import { CLIMATE } from 'constants/thunderstruck';
import { toSeconds } from 'utils/thunderstruck';
import TREE from 'data/trees';
import TreeCard from './TreeCard';
import { setTitle } from 'utils/string';

moment_tz;

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, 'd', ' ', /\d/, /\d/, 'h', ' ', /\d/, /\d/, 'm', ' ', /\d/, /\d/, 's']}
      showMask
    />
  );
}

class Thunderstruck extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    timeRemaining: '',
    climate: '',
    tree: '',
    note: '',
  };

  changeTime = (event) => {
    this.setState({ timeRemaining: event.target.value });
  };

  changeClimate = (e, value) => {
    this.setState({ climate: value.key });
  };

  changeTree = (e, value) => {
    this.setState({ tree: value.key });
  };

  changeNote = (event) => {
    this.setState({ note: event.target.value });
  };

  addTree = () => {
    const { timeRemaining, climate, tree, note } = this.state;
    if (tree === '' || climate === '') return;
    const enteredTime = toSeconds(timeRemaining.replace(/(\d)_/g, (m, n) => n).replace(/_/g, '0').replace(/ /g, ''));
    const treeObj = TREE.find((row) => row.name === tree);
    let defaultTime = toSeconds(treeObj.matures);
    if (treeObj.climate && treeObj.climate === climate) {
      defaultTime = Math.ceil(defaultTime * 0.7);
    }
    const timeToTrack = enteredTime > defaultTime || enteredTime === 0 ? defaultTime : enteredTime;
    const ready = moment().add(timeToTrack, 'seconds');

    let noteTrim = note.trim();
    if (noteTrim.length > 100) {
      noteTrim = noteTrim.substr(0, 100);
    }

    this.props.addTree(tree, ready.valueOf(), climate, noteTrim);
    this.setState({
      tree: '',
      climate: '',
      note: '',
      timeRemaining: ' ',
    });
  };

  render() {
    const { mobile, trees, removeTree } = this.props;
    const { timeRemaining, climate, tree, note } = this.state;

    setTitle('Thunderstruck Timer');

    return (
      <div className={cn('calendar-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Thunderstruck Timer</Typography>
            </Toolbar>
          </AppBar>
          <div className="thunderstruck-container">
            <FormControl className="ts-select">
              <InputLabel htmlFor="zone">Tree</InputLabel>
              <Select
                value={tree}
                onChange={this.changeTree}
                inputProps={{
                  name: 'zone',
                  id: 'zone',
                }}
                style={{ width: '100%' }}
              >
                {TREE.map(({ name, quality }) => (
                  <MenuItem
                    key={name}
                    value={name}
                    data-quality={quality}
                  >
                    <span className="quality-color">{name}</span>
                  </MenuItem>),
                )}
              </Select>
            </FormControl>
            <FormControl className="ts-select">
              <InputLabel htmlFor="climate">Climate</InputLabel>
              <Select
                value={climate}
                onChange={this.changeClimate}
                inputProps={{
                  name: 'climate',
                  id: 'climate',
                }}
                style={{ width: '100%' }}
              >
                {Object.values(CLIMATE).map((climate) => (
                  <MenuItem
                    key={climate}
                    value={climate}
                  >
                    {climate}
                  </MenuItem>),
                )}
              </Select>
            </FormControl>
            <FormControl className="ts-select">
              <InputLabel htmlFor="time-input">Time Remaining</InputLabel>
              <Input
                value={timeRemaining}
                onChange={this.changeTime}
                id="time-input"
                inputComponent={TextMaskCustom}
              />
              <Typography variant="overline" style={{ fontSize: 10 }}>Leave blank for default times.</Typography>
            </FormControl>
            <TextField
              className="ts-select"
              label="Note (optional)"
              value={note}
              onChange={this.changeNote}
            />
            <FormControl className="ts-track-button">
              <Button color="primary" variant="contained" onClick={this.addTree}>Track</Button>
            </FormControl>
          </div>
        </Paper>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Growth Timers</Typography>
            </Toolbar>
          </AppBar>
          {trees.map((tree, index) => (<TreeCard {...tree} key={`tree-${index}`} onDelete={() => removeTree(index)} />))}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, thunderstruck: { trees } }) => ({
  mobile,
  trees,
});

const mapDispatchToProps = {
  addTree,
  removeTree,
};

export default connect(mapStateToProps, mapDispatchToProps)(Thunderstruck);
