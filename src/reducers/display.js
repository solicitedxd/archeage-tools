import {
  CLOSE_DIALOG,
  DARK_MODE,
  DISPLAY_MOBILE,
  OPEN_DIALOG,
  SET_HIDE_ADS,
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
        dialogFunc: action.dialogFunc,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: null,
      };
    case SET_HIDE_ADS:
      return {
        ...state,
        hideAds: action.hideAds,
      };
    default:
      return state;
  }
};

export default display;
