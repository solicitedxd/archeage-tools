import {
  SESSION_LOGOUT,
  SESSION_USER,
  SESSION_WINDOW,
  SESSION_WINDOW_CLOSE,
} from 'constants/session';
import initialSate from 'initialStates/session';
import Cookies from 'js-cookie';
import moment from 'moment';
import { getItem } from 'utils/localStorage';

const cookieProps = {
  secure: window.location.protocol === 'https:',
  domain: '.mokulu.io',
  path: '/',
};

const session = (state = getItem('session', initialSate), action) => {
  const { type, ...other } = action;
  switch (action.type) {
    case SESSION_USER:
      const { access_token, refresh_token } = other;
      const expires = moment().add(30, 'days').toDate();
      if (access_token) {
        Cookies.set('access_token', access_token, {
          ...cookieProps,
          expires,
        });
      }
      if (refresh_token) {
        Cookies.set('refresh_token', refresh_token, {
          ...cookieProps,
          expires,
        });
      }
      return {
        ...state,
        ...other,
      };
    case SESSION_LOGOUT:
      Cookies.remove('access_token', cookieProps);
      Cookies.remove('refresh_token', cookieProps);
      return initialSate;
    case SESSION_WINDOW:
      return {
        ...state,
        windows: {
          ...state.windows,
          ...other,
        },
      };
    case SESSION_WINDOW_CLOSE:
      return {
        ...state,
        windows: {},
      };
    default:
      return state;
  }
};

export default session;
