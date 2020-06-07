import {
  ADD_CROP,
  DELETE_CROP,
  RESTART_CROP,
} from 'constants/crops';

export const triggerLocalStorageUpdate = [
  ADD_CROP,
  DELETE_CROP,
];

export const addCrop = (crop, time, climate, timer, seedbed, note) => (dispatch) => {
  dispatch({ type: ADD_CROP, crop, time, climate, timer, seedbed, note });
};

export const removeCrop = (index) => (dispatch) => {
  dispatch({ type: DELETE_CROP, index });
};

export const restartCrop = (index, time, timer) => (dispatch) => {
  dispatch({ type: RESTART_CROP, index, time, timer });
};

