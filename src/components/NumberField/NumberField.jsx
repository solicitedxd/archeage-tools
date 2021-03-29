import {
  InputAdornment,
  TextField,
} from '@material-ui/core';
import debounce from 'lodash.debounce';
import React, { PureComponent } from 'react';
import {
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { maxDecimals } from 'utils/number';

class NumberField extends PureComponent {
  static propTypes = {
    id: string,
    value: number,
    onChange: func.isRequired,
    endAdornment: string,
    inputStyle: object,
    InputProps: object,
    min: number,
    max: number,
    step: number,
    onFocus: func,
    onBlur: func,
  };

  static defaultProps = {
    step: 1,
    value: 0,
    inputStyle: {},
    InputProps: {},
  };

  state = {
    value: 0,
    focused: false,
  };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    const { focused } = this.state;

    if (!focused) {
      this.setState({ value });
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });

    this._updateValue();
  };

  updateValue = () => {
    const { onChange, min, max } = this.props;
    const { value: inputValue } = this.state;

    let value = String(inputValue).replace(/[^\d\\.]+/g, '');
    if (value !== '') {
      if (max) {
        value = Math.min(value, max);
      }
      if (min) {
        value = Math.max(value, min);
      }
      value = maxDecimals(value, 4);
    }

    this.setState({ value }, () => {
      if (!Number.isNaN(value)) {
        if (value === '' && min) {
          value = min;
        }
        onChange(value);
      }
    });
  };

  _updateValue = debounce(this.updateValue, 1000);

  handleFocus = (focused) => (e) => {
    const { onFocus, onBlur, min } = this.props;
    const { value } = this.state;

    this.setState({ focused }, () => {
      if (!focused) {
        if (value === '') {
          this.setState({ value: (min || 0) });
        } else {
          this.updateValue();
        }
      }

      if (focused && onFocus) {
        onFocus(e);
      }
      if (!focused && onBlur) {
        onBlur(e);
      }
    });
  };

  render() {
    const { inputStyle, min, max, step, endAdornment, InputProps, ...otherProps } = this.props;
    const { value } = this.state;

    return (
      <TextField
        margin="dense"
        {...otherProps}
        value={value}
        onChange={this.handleChange}
        onFocus={this.handleFocus(true)}
        onBlur={this.handleFocus(false)}
        type="number"
        inputProps={{
          style: { textAlign: 'right', ...inputStyle },
          min,
          max,
          step,
        }}
        InputProps={{
          endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null,
          ...InputProps,
        }}
      />
    );
  }
}

export default NumberField;
