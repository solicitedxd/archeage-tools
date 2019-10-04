import {
  NOTIFICATION,
  NOTIFICATION_CLEAR,
} from 'constants/notification';

export const setNotification = (message, duration = 10000) => (dispatch) => {
  dispatch({ type: NOTIFICATION, message, duration })
};

export const clearNotification = () => (dispatch) => {
  dispatch({ type: NOTIFICATION_CLEAR })
};

