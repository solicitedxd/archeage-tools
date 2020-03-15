import {
  SET_CONTINENT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_OUTLET,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_TRANSPORTATION_QUANTITY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';
import { validateQuantity } from 'utils/string';

export const triggerLocalStorageUpdate = [
  SET_CONTINENT,
  SET_OUTLET,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_TRANSPORTATION_QUANTITY,
  SET_WAR,
  TRADE_PACK_RESET,
];

export const setContinent = (e, { props: { children: continent } }) => (dispatch) => {
  dispatch({ type: SET_CONTINENT, continent });
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

export const setFreshness = (originZone, packType, sellZone) => (dispatch) => (e, { key: profit }) => {
  dispatch({ type: SET_FRESHNESS, originZone, packType, sellZone, profit });
};

export const setInterest = (e, showInterest) => (dispatch) => {
  dispatch({ type: SET_INTEREST, showInterest });
};

export const setPercentage = (originZone, packType, sellZone) => (dispatch) => (e, percentage) => {
  if (originZone && packType && sellZone) {
    dispatch({ type: SET_PERCENTAGE, originZone, packType, percentage, sellZone });
  } else {
    dispatch({ type: SET_PERCENTAGE_DEFAULT, percentage });
  }
};

export const setQuantity = (originZone, packType) => (dispatch) => (e) => {
  let { target: { value } } = e;
  value = validateQuantity(1, 999)(value);
  dispatch({ type: SET_QUANTITY, originZone, packType, quantity: Math.abs(value) });
};

export const setWar = (zone) => (dispatch) => (e, war) => {
  dispatch({ type: SET_WAR, zone, war });
};

export const setSupply = (originZone) => (dispatch) => (e, { key: supply }) => {
  dispatch({ type: SET_SUPPLY, originZone, supply });
};

export const setTransportationQuantity = (originZone, sellZone, item) => (dispatch) => (e) => {
  let { target: { value } } = e;
  value = validateQuantity(0, 99)(value);
  dispatch({ type: SET_TRANSPORTATION_QUANTITY, originZone, sellZone, item, value });
};

export const resetSettings = () => (dispatch) => {
  dispatch({ type: TRADE_PACK_RESET });
};
