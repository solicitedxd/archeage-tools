import {
  SET_CARGO_SHIP,
  SET_REGION,
} from 'constants/schedule';

export const triggerLocalStorageUpdate = [
  SET_CARGO_SHIP,
  SET_REGION,
];

export const setRegion = (value) => (dispatch) => {
  dispatch({ type: SET_REGION, regionNA: value });
};

export const setCargoShip = (cargoShip) => (dispatch) => {
  dispatch({ type: SET_CARGO_SHIP, cargoShip });
};
