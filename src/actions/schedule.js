import { SET_REGION } from 'constants/schedule';

export const triggerLocalStorageUpdate = [
  SET_REGION,
];

export const setRegion = (value) => (dispatch) => {
  dispatch({ type: SET_REGION, regionNA: value });
};
