import { replace } from 'actions/navigate';
import { setNotification } from 'actions/notification';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import {
  SESSION_LOGOUT,
  SESSION_USER,
  SESSION_WINDOW,
  SESSION_WINDOW_CLOSE,
} from 'constants/session';
import Cookies from 'js-cookie';
import { pathOr } from 'ramda';
import xhr from 'utils/xhr';

export const attemptLogin = (data) => (dispatch) => new Promise((resolve, reject) => {
  xhr.post(config.endpoints.session.authenticate, { grant_type: 'password', ...data }, { withCredentials: true })
  .then(({ data }) => {
    dispatch({ type: SESSION_USER, ...data });
    resolve();
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
    xhr.get(config.endpoints.service.me)
    .then(({ data: permissions }) => {
      dispatch({ type: SESSION_USER, permissions });
      resolve();
    });
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
    const status = pathOr('', ['status'])(error);
    if (status === 400) {
      dispatch(setNotification('Your session has expired. Please log in again.', NOTIFICATION_TYPE.ERROR));
    } else {
      dispatch(setNotification('An unknown error occurred. Please log in again.', NOTIFICATION_TYPE.ERROR));
    }
    dispatch(logout());
  });
});

export const requiresLogin = () => (dispatch) => {
  dispatch({ type: SESSION_LOGOUT });
  dispatch(setNotification('Your session has expired. Please log in.', NOTIFICATION_TYPE.ERROR));
  dispatch(displayLogin(true));
};

export const displayLogin = (login) => (dispatch) => {
  dispatch({ type: SESSION_WINDOW, login });
};

export const displayRegister = (register) => (dispatch) => {
  dispatch({ type: SESSION_WINDOW, register });
};

export const closeWindow = () => (dispatch) => {
  dispatch({ type: SESSION_WINDOW_CLOSE });
};

export const requiresPermission = (permission, failPath, message = 'You do not have permission to view this page.') => (dispatch) => {
  const allowed = dispatch(hasPermission(permission));

  if (!allowed) {
    dispatch(setNotification(message, NOTIFICATION_TYPE.ERROR));

    if (typeof failPath === 'function') {
      failPath();
    } else {
      replace(failPath || '/');
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: SESSION_LOGOUT });
};

export const hasPermission = (permission) => (dispatch, getState) => {
  const permissions = Cookies.get('access_token') ? pathOr([], ['session', 'permissions'])(getState()) : [];

  if (permissions.includes(permission.toLowerCase())) {
    return true;
  }

  // find wildcard permissions
  return permission.split('.').some((_, i, permWhole) => {
    const wildcard = permWhole.slice(0, i).join('.');
    return permissions.includes(wildcard ? wildcard : '*');
  });
};
