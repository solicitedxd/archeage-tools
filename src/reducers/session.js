import {
  SESSION_LOGOUT,
  SESSION_USER,
} from 'constants/session';
import initialSate from 'initialStates/session';
import Cookies from 'js-cookie';
import moment from 'moment';
import { getItem } from 'utils/localStorage';

const cookieProps = {
  secure: window.location.protocol === 'https:',
  domain: '.mokulu.io',
  path: '',
};

const session = (state = getItem('session', initialSate), action) => {
  switch (action.type) {
    case SESSION_USER:
      const { type, ...other } = action;
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
    default:
      return state;
  }
};

export default session;
