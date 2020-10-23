import { SET_ITEM_PRICE } from 'constants/items';

export const triggerLocalStorageUpdate = [
  SET_ITEM_PRICE,
];

/**
 * Sets an item price.
 * @param itemId{number} item id
 * @param price{number} price
 * @param unitSize{number} number of units for the given price
 * @returns {function} redux dispatch call
 */
export const setItemPrice = (itemId, price, unitSize = 1) => (dispatch) => {
  dispatch({ type: SET_ITEM_PRICE, itemId, price: Number((Math.abs(price) / unitSize).toFixed(6)) });
};

/**
 * Gets an item's single unit price.
 * @param itemId{number} item id
 * @returns {function} redux call
 */
export const getItemPrice = (itemId) => (_, getState) => {
  const { itemPrice } = getState();
  return itemPrice[itemId] || 0;
};
