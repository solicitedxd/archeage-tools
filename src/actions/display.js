import { DISPLAY_MOBILE } from 'constants/display';

export const setMobile = (mobile) => (dispatch) => {
  dispatch({ type: DISPLAY_MOBILE, mobile });
};
