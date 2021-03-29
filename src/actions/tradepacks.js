import {
  SET_AH_CUT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_INTEREST,
  SET_OUTLET,
  SET_PACK_REGION,
  SET_PACK_TABLE,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PROFIT_LEVEL,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_TRANSPORTATION_QUANTITY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';
import { validateQuantity } from 'utils/string';

export const triggerLocalStorageUpdate = [
  SET_AH_CUT,
  SET_PACK_TABLE,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_PROFIT_LEVEL,
  SET_INTEREST,
  SET_OUTLET,
  SET_PACK_REGION,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_TRANSPORTATION_QUANTITY,
  SET_WAR,
  TRADE_PACK_RESET,
];

/**
 * Sets the publisher region for trade pack prices.
 * @param region{string} region code
 * @returns {function} redux dispatch call
 */
export const setPackRegion = (region) => (dispatch) => {
  dispatch({ type: SET_PACK_REGION, region });
};

export const setPackTable = (e, packTable) => (dispatch) => {
  dispatch({ type: SET_PACK_TABLE, packTable });
};

export const setOutlet = (e, outlet) => (dispatch) => {
  dispatch({ type: SET_OUTLET, outlet });
};

export const setCraftLarder = (e, craftLarder) => (dispatch) => {
  dispatch({ type: SET_CRAFT_LARDER, craftLarder });
};

export const setDegradation = (e, degradeDemand) => (dispatch) => {
  dispatch({ type: SET_DEGRADATION, degradeDemand });
};

export const setProfitLevel = (packId, sellZoneId) => (dispatch) => (e, profit) => {
  dispatch({ type: SET_PROFIT_LEVEL, packId, sellZoneId, profit });
};

export const setInterest = (e, showInterest) => (dispatch) => {
  dispatch({ type: SET_INTEREST, showInterest });
};

export const setPercentage = (packId, sellZoneId) => (dispatch) => (percentage) => {
  if (packId && sellZoneId) {
    dispatch({ type: SET_PERCENTAGE, packId, percentage, sellZoneId });
  } else {
    dispatch({ type: SET_PERCENTAGE_DEFAULT, percentage });
  }
};

export const setQuantity = (packId) => (dispatch) => (value) => {
  value = validateQuantity(1, 1000)(value);
  dispatch({ type: SET_QUANTITY, packId, quantity: Math.abs(value) });
};

export const setWar = (zoneId) => (dispatch) => (e, war) => {
  dispatch({ type: SET_WAR, zoneId, war });
};

export const setSupply = (packId) => (dispatch) => (e, supply) => {
  dispatch({ type: SET_SUPPLY, packId, supply });
};

export const setTransportationQuantity = (originZoneId, sellZoneId, item) => (dispatch) => (value) => {
  value = validateQuantity(0, 100)(value);
  dispatch({ type: SET_TRANSPORTATION_QUANTITY, originZoneId, sellZoneId, item, value });
};

export const resetSettings = () => (dispatch) => {
  dispatch({ type: TRADE_PACK_RESET });
};

export const setAHCut = (itemId) => (dispatch) => (e, cut) => {
  cut = Number.parseInt(cut);
  dispatch({ type: SET_AH_CUT, itemId, cut });
};
