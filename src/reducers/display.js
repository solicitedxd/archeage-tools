import initialState from 'initialStates/display';
import { DISPLAY_MOBILE } from 'constants/display';

const display = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MOBILE:
      return {
        ...state,
        mobile: action.mobile,
      };
    default:
      return state;
  }
};

export default display;
