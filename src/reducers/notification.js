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
        variant: action.variant,
        open: true,
      };
    case NOTIFICATION_CLEAR:
      return {
        ...state,
        open: false,
        duration: 0,
      };
    default:
      return state;
  }
};

export default notification;
