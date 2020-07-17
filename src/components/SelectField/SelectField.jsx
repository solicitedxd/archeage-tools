import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  object,
  oneOfType,
  string,
} from 'react-proptypes';

class SelectField extends Component {
  static propTypes = {
    id: string.isRequired,
    label: string,
    onChange: func,
    value: oneOfType([bool, number, string]),
    options: oneOfType([array, object]),
    renderValue: func,
    controlClassName: string,
  };

  static defaultProps = {
    label: null,
    onChange: () => {
    },
    value: null,
    options: [],
    'renderValue': (value) => value,
    controlClassName: null,
  };

  state = {};

  handleChange = (e, { props: { value } }) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e, value);
    }
  };

  render() {
    const { id, label, value, renderValue, controlClassName } = this.props;
    let { options } = this.props;

    const entry = (key, value) => (
      <MenuItem key={`${id}-${key}`} value={key}>{value}</MenuItem>
    );

    if (options instanceof Map) {
      const opts = [];
      options.forEach((value, key) => opts.push(entry(key, value)));
      options = opts;
    } else if (Array.isArray(options)) {
      options = options.map(value => entry(value, value));
    } else {
      options = Object.entries(options).map(([key, value]) => entry(key, value));
    }

    return (
      <FormControl className={controlClassName}>
        {label &&
        <InputLabel htmlFor={id}>{label}</InputLabel>}
        <Select
          value={value}
          onChange={this.handleChange}
          inputProps={{
            name: id,
            id,
          }}
          renderValue={renderValue}
        >
          {options}
        </Select>
      </FormControl>
    );
  }
}

export default SelectField;
