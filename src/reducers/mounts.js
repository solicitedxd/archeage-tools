import {
  SET_DISPLAY_GRID,
  SET_ONLY_OBTAINABLE,
} from 'constants/mounts';
import initialState from 'initialStates/mounts';
import { getItem } from 'utils/localStorage';

const mounts = (state = getItem('mounts', initialState), action) => {
  switch (action.type) {
    case SET_DISPLAY_GRID:
      return {
        ...state,
        displayGrid: action.displayGrid,
      };
    case SET_ONLY_OBTAINABLE:
      return {
        ...state,
        onlyObtainable: action.onlyObtainable,
      };
    default:
      return state;
  }
};

export default mounts;
