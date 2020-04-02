import {
  NOTIFICATION,
  NOTIFICATION_CLEAR,
  NOTIFICATION_TYPE,
} from 'constants/notification';

export const setNotification = (message, variant = NOTIFICATION_TYPE.INFO, duration = 10000) => (dispatch) => {
  dispatch({ type: NOTIFICATION, message, variant, duration });
};

export const clearNotification = () => (dispatch) => {
  dispatch({ type: NOTIFICATION_CLEAR });
};

