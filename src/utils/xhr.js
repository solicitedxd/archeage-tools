import {
  refreshSession,
  requiresLogin,
} from 'actions/session';
import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';

const xhr = axios.create();
const { dispatch } = store;

xhr.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get('access_token');
    const headers = config.headers;

    if (access_token && headers) {
      headers.Authorization = `bearer ${access_token}`;
      headers['Content-Type'] = 'application/json';
    }

    return config;
  },
);

xhr.interceptors.response.use(
  (response) => response,
  (e) => {
    if (e.response) {
      const error = e.response;
      if (error.status === 401) {
        const refresh_token = Cookies.get('refresh_token');
        if (refresh_token && error.data.errorMessage !== 'Invalid refresh_token') {
          const request = error.config;
          return new Promise((resolve) => {
            dispatch(refreshSession())
            .then((refreshResponse) => {
              request.headers.Authorization = `bearer ${refreshResponse.access_token}`;
              resolve(xhr.request(request));
            });
          });
        } else {
          dispatch(requiresLogin());
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(e);
  },
);

export default xhr;
