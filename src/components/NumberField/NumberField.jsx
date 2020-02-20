import {
  InputAdornment,
  TextField,
} from '@material-ui/core';
import {
  func,
  number,
  object,
  string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { maxDecimals } from 'utils/thunderstruck';

class NumberField extends PureComponent {
  static propTypes = {
    id: string,
    value: number,
    onChange: func.isRequired,
    endAdornment: string,
    inputStyle: object,
    min: number,
    max: number,
    step: number,
  };

  static defaultProps = {
    step: 1,
    value: 0,
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
    const { onChange, min, max } = this.props;
    let value = String(e.target.value).replace(/[^\d\\.]+/g, '');
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
        onChange(value);
      }
    });
  };

  handleFocus = (focused) => (e) => {
    const { onFocus, onBlur } = this.props;

    this.setState({ focused }, () => {
      if (!focused && this.state.value === '') {
        this.setState({ value: '0' });
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
    const { inputStyle, min, max, step, endAdornment, defaultValue, ...otherProps } = this.props;
    const { value } = this.state;

    return (
      <TextField
        {...otherProps}
        value={value}
        onChange={this.handleChange}
        onFocus={this.handleFocus(true)}
        onBlur={this.handleFocus(false)}
        type="number"
        margin="dense"
        inputProps={{
          style: { textAlign: 'right', ...inputStyle },
          min,
          max,
          step,
        }}
        InputProps={{
          endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null,
        }}
      />
    );
  }
}

export default NumberField;
