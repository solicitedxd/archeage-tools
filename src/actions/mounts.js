import {
  SET_DISPLAY_GRID,
  SET_ONLY_OBTAINABLE,
} from 'constants/mounts';

export const triggerLocalStorageUpdate = [
  SET_DISPLAY_GRID,
  SET_ONLY_OBTAINABLE,
];

export const setDisplayGrid = (displayGrid) => (dispatch) => {
  dispatch({ type: SET_DISPLAY_GRID, displayGrid });
};

export const setOnlyObtainable = (onlyObtainable) => (dispatch) => {
  dispatch({ type: SET_ONLY_OBTAINABLE, onlyObtainable });
};
