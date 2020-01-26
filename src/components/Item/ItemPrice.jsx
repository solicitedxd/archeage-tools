import {
  Input,
  InputAdornment,
} from '@material-ui/core';
import { setItemPrice } from 'actions/itemPrice';
import React, { Component } from 'react';
import { number } from 'react-proptypes';
import { connect } from 'react-redux';
import { maxDecimals } from 'utils/thunderstruck';

class ItemPrice extends Component {
  static propTypes = {
    itemId: number.isRequired,
    unitSize: number,
  };

  static defaultProps = {
    unitSize: 1,
    inputStyle: {},
  };

  state = {};

  render() {
    const { itemPrice, itemId, unitSize, setItemPrice, inputStyle } = this.props;

    return (
      <Input
        id={`item-price-${itemId}`}
        value={maxDecimals(itemPrice[itemId] * unitSize || 0, 4)}
        onChange={(e) => setItemPrice(itemId, e.target.value, unitSize)}
        type="number"
        margin="dense"
        inputProps={{
          style: { textAlign: 'right', width: 120, ...inputStyle },
          min: 0,
          max: 10000,
          step: 0.0001,
        }}
        endAdornment={<InputAdornment position="end">g</InputAdornment>}
      />
    );
  }
}

const mapStateToProps = ({ itemPrice }) => ({
  itemPrice,
});

const mapDispatchToProps = {
  setItemPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPrice);
