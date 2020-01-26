import { SET_ITEM_PRICE } from 'constants/items';

export const triggerLocalStorageUpdate = [
  SET_ITEM_PRICE,
];

export const setItemPrice = (itemId, price, unitSize = 1) => (dispatch) => {
  dispatch({ type: SET_ITEM_PRICE, itemId, price: Number((Math.abs(price) / unitSize).toFixed(6)) });
};
