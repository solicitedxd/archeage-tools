import {
  DARK_MODE,
  DISPLAY_MOBILE,
} from 'constants/display';

export const triggerLocalStorageUpdate = [
  DARK_MODE,
];

export const setMobile = (mobile) => (dispatch) => {
  dispatch({ type: DISPLAY_MOBILE, mobile });
};

export const setDarkMode = (darkMode) => (dispatch) => {
  dispatch({ type: DARK_MODE, darkMode });
};
