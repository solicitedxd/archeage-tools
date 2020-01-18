import { go } from 'actions/navigate';
import { setNotification } from 'actions/notification';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import {
  SESSION_LOGOUT,
  SESSION_USER,
} from 'constants/session';
import { pathOr } from 'ramda';
import xhr from 'utils/xhr';

export const attemptLogin = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
  const { session } = getState();
  xhr.post(config.endpoints.session.authenticate, { grant_type: 'password', ...data }, { withCredentials: true })
  .then(({ data }) => {
    dispatch({ type: SESSION_USER, ...data, redirect: '' });
    resolve(session.redirect);
  })
  .catch(error => {
    const status = pathOr(500, ['status'])(error);
    if (status === 400) {
      dispatch(setNotification('Invalid username or password.', NOTIFICATION_TYPE.ERROR));
    } else {
      dispatch(setNotification('Error attempting login. Please try later.', NOTIFICATION_TYPE.ERROR));
    }
    reject(error);
  });
});

export const fetchMe = () => (dispatch) => new Promise((resolve) => {
  xhr.get(config.endpoints.session.me)
  .then(({ data }) => {
    dispatch({ type: SESSION_USER, ...data });
    resolve();
  })
  .catch(() => {
  });
});

export const createAccount = (data) => (dispatch) => new Promise((resolve, reject) => {
  xhr.post(config.endpoints.session.createAccount, data, { withCredentials: true })
  .then(({ data }) => {
    resolve(data);
  })
  .catch(error => {
    const status = pathOr(500, ['status'])(error);
    const errors = pathOr([], ['data', 'errors'])(error);
    if (status === 500) {
      dispatch(setNotification('Error attempting create account. Please try later.', NOTIFICATION_TYPE.ERROR));
    }
    reject(errors);
  });
});

export const refreshSession = () => (dispatch, getStorage) => new Promise((resolve) => {
  const { session } = getStorage();
  xhr.post(config.endpoints.session.authenticate, {
    grant_type: 'refresh_token',
    refresh_token: session.refresh_token,
  })
  .then(({ data }) => {
    dispatch({ type: SESSION_USER, ...data });
    resolve(data);
  })
  .catch(error => {
    const status = pathOr('', ['response', 'status'])(error);
    if (status === 400) {
      dispatch(setNotification('Your session has expired. Please log in again.', NOTIFICATION_TYPE.ERROR));
    } else {
      dispatch(setNotification('An unknown error occurred. Please log in again.', NOTIFICATION_TYPE.ERROR));
    }
  });
});

export const requiresLogin = () => (dispatch) => {
  dispatch({ type: SESSION_LOGOUT });
  dispatch(setNotification('Your session has expired. Please log in.', NOTIFICATION_TYPE.ERROR));
  go('/login');
};

export const requiresAuth = () => (dispatch, getState) => {
  const { session } = getState();
  const allowed = Boolean(session.access_token) && Boolean(session.username);

  if (!allowed) {
    setNotification('You must login to see this page.', NOTIFICATION_TYPE.WARNING);
    dispatch({ type: SESSION_USER, redirect: window.location.pathname });
    go('/login');
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: SESSION_LOGOUT });
  go('/');
};

export const clearRedirect = () => (dispatch) => {
  dispatch({ type: SESSION_USER, redirect: '' });
};
