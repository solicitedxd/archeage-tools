import {
  ADD_CROP,
  DELETE_CROP,
  MARK_CROP,
  RESTART_CROP,
} from 'constants/crops';

export const triggerLocalStorageUpdate = [
  ADD_CROP,
  DELETE_CROP,
  RESTART_CROP,
  MARK_CROP,
];

/**
 * Add a crop to track.
 * @param crop crop id
 * @param time time left
 * @param climate crop climate
 * @param timer timer type
 * @param seedbed is in seed bed
 * @param note crop note
 * @returns {function} redux dispatch call
 */
export const addCrop = (crop, time, climate, timer, seedbed, note) => (dispatch) => {
  dispatch({ type: ADD_CROP, crop, time, climate, timer, seedbed, note });
};

/**
 * Remove a crop timer.
 * @param index crop timer index
 * @returns {function} redux dispatch call
 */
export const removeCrop = (index) => (dispatch) => {
  dispatch({ type: DELETE_CROP, index });
};

/**
 * Restart a crops' timer.
 * @param index crop timer index
 * @param time total time
 * @param timer timer type
 * @returns {function} redux dispatch call
 */
export const restartCrop = (index, time, timer) => (dispatch) => {
  dispatch({ type: RESTART_CROP, index, time, timer });
};

/**
 * Set the mark on a crop.
 * @param index crop timer index
 * @param mark mark value
 * @returns {function} redux dispatch call
 */
export const markCrop = (index, mark) => (dispatch) => {
  dispatch({ type: MARK_CROP, index, mark });
};
