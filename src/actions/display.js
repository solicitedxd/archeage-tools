import {
  CLOSE_DIALOG,
  DARK_MODE,
  DISPLAY_MOBILE,
  OPEN_DIALOG,
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

export const openDialog = (dialogName) => (dispatch) => {
  dispatch({ type: OPEN_DIALOG, dialog: dialogName });
};

export const closeDialog = () => (dispatch) => {
  dispatch({ type: CLOSE_DIALOG });
};
