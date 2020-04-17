import {
  CLEAR_ALERTS,
  SET_ALERT,
  SET_REGION,
  SET_VOLUME,
} from 'constants/schedule';

export const triggerLocalStorageUpdate = [
  SET_REGION,
  SET_ALERT,
  CLEAR_ALERTS,
  SET_VOLUME,
];

export const setRegion = (value) => (dispatch) => {
  dispatch({ type: SET_REGION, regionNA: value });
};

export const setAlert = (eventId, value) => (dispatch) => () => {
  dispatch({ type: SET_ALERT, eventId, value });
};

export const clearAlerts = () => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
};

export const setVolume = (volume) => (dispatch) => {
  dispatch({ type: SET_VOLUME, volume });
};
