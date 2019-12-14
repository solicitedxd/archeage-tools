import {
  DARK_MODE,
  DISPLAY_MOBILE,
} from 'constants/display';
import initialState from 'initialStates/display';
import { getItem } from 'utils/localStorage';

const display = (state = getItem('display', initialState), action) => {
  switch (action.type) {
    case DISPLAY_MOBILE:
      return {
        ...state,
        mobile: action.mobile,
      };
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    default:
      return state;
  }
};

export default display;
