import { setItemPrice } from 'actions/itemPrice';
import NumberField from 'components/NumberField';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { maxDecimals } from 'utils/number';

class ItemPrice extends Component {
  static propTypes = {
    itemId: number.isRequired,
    unitSize: number,
    setItemPrice: func.isRequired,
    inputStyle: object,
    itemPrice: object,
    inTable: bool,
  };

  static defaultProps = {
    unitSize: 1,
    inputStyle: {},
  };

  setItemPrice = (price) => {
    const { itemId, unitSize, setItemPrice } = this.props;

    setItemPrice(itemId, price, unitSize);
  };

  handleChange = debounce(this.setItemPrice, 250);

  render() {
    const { itemId, inputStyle, itemPrice, unitSize } = this.props;
    const price = maxDecimals((itemPrice[itemId] * unitSize) || 0, 4);

    return (
      <NumberField
        id={`item-price-${itemId}`}
        value={price}
        onChange={this.handleChange}
        inputStyle={{
          width: 100,
          ...inputStyle,
        }}
        min={0}
        max={10000}
        step={0.0001}
        endAdornment="g"
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
