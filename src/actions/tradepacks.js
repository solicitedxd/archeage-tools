import {
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';

export const triggerLocalStorageUpdate = [
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_WAR,
  TRADE_PACK_RESET,
];

export const setProficiency = (proficiency) => (dispatch) => (e, { key: rank }) => {
  dispatch({ type: SET_PROFICIENCY, proficiency, rank });
};

export const setPercentage = (zone, packType) => (dispatch) => (e, percentage) => {
  if (zone && packType) {
    dispatch({ type: SET_PERCENTAGE, zone, packType, percentage });
  } else {
    dispatch({ type: SET_PERCENTAGE_DEFAULT, percentage });
  }
};

export const setWar = (zone) => (dispatch) => (e, war) => {
  dispatch({ type: SET_WAR, zone, war });
};

export const setPrice = (item) => (dispatch) => (e, price) => {
  dispatch({ type: SET_PRICE, item, price });
};

export const resetSettings = () => (dispatch) => {
  dispatch({ type: TRADE_PACK_RESET });
};
