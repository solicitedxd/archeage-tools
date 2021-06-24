import {
  CLOSE_DIALOG,
  DARK_MODE,
  DISPLAY_MOBILE,
  OPEN_DIALOG,
  SET_HIDE_ADS,
} from 'constants/display';

export const triggerLocalStorageUpdate = [
  DARK_MODE,
  SET_HIDE_ADS,
];

export const setMobile = (mobile) => (dispatch) => {
  dispatch({ type: DISPLAY_MOBILE, mobile });
};

export const setDarkMode = (darkMode) => (dispatch) => {
  dispatch({ type: DARK_MODE, darkMode });
};

export const openDialog = (dialogName, dialogFunc) => (dispatch) => {
  dispatch({ type: OPEN_DIALOG, dialog: dialogName, dialogFunc });
};

export const closeDialog = () => (dispatch) => {
  dispatch({ type: CLOSE_DIALOG });
};

export const setHideAds = (hideAds) => (dispatch) => {
  dispatch({ type: SET_HIDE_ADS, hideAds });
};
