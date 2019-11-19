import {
  SET_CONTINENT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';

export const triggerLocalStorageUpdate = [
  SET_CONTINENT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_WAR,
  TRADE_PACK_RESET,
];

export const setContinent = (e, { props: { children: continent } }) => (dispatch) => {
  dispatch({ type: SET_CONTINENT, continent });
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

export const setProficiency = (proficiency) => (dispatch) => (e, { key: rank }) => {
  dispatch({ type: SET_PROFICIENCY, proficiency, rank });
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
  if (value === '0') value = 1;
  if (!value) return;
  dispatch({ type: SET_QUANTITY, originZone, packType, quantity: Math.abs(value) });
};

export const setWar = (zone) => (dispatch) => (e, war) => {
  dispatch({ type: SET_WAR, zone, war });
};

export const setPrice = (item) => (dispatch) => (e) => {
  const { target: { value } } = e;
  dispatch({ type: SET_PRICE, item, price: Math.abs(value) });
};

export const setSupply = (originZone) => (dispatch) => (e, { key: supply }) => {
  dispatch({ type: SET_SUPPLY, originZone, supply });
};

export const resetSettings = () => (dispatch) => {
  dispatch({ type: TRADE_PACK_RESET });
};
