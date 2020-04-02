import { SET_ITEM_PRICE } from 'constants/items';
import initialState from 'initialStates/itemPrice';
import { getItem } from 'utils/localStorage';

const itemPrice = (state = getItem('itemPrice', initialState), action) => {
  switch (action.type) {
    case SET_ITEM_PRICE:
      return {
        ...state,
        [action.itemId]: action.price,
      };
    default:
      return state;
  }
};

export default itemPrice;
