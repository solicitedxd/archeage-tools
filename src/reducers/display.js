import {
  CLOSE_DIALOG,
  DARK_MODE,
  DISPLAY_MOBILE,
  OPEN_DIALOG,
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
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: action.dialog,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: null,
      };
    default:
      return state;
  }
};

export default display;
