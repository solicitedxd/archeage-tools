import {
  NOTIFICATION,
  NOTIFICATION_CLEAR,
} from 'constants/notification';
import initialState from 'initialStates/notification';

const notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        message: action.message,
        duration: action.duration,
        open: true,
      };
    case NOTIFICATION_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default notification;
