import { setNotification } from 'actions/notification';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import { DATA_USERS } from 'constants/users';
import debounce from 'lodash.debounce';
import { arrayToMap } from 'utils/array';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';
import store from '../store';

const { dispatch } = store;

/** User Batching **/
let userQueue = new Set();

const fetchUserQueue = debounce(() => {
  dispatch(fetchUsers(Array.from(userQueue)));
  userQueue = new Set();
}, 50);

export const fetchUser = (user) => {
  if (!user || user === 'undefined') return;
  userQueue.add(user);

  fetchUserQueue();
};

export const fetchUsers = (...users) => (dispatch, getState) => {
  const storedUsers = getState().users;

  let userNames = Array.isArray(users[0]) ? new Set(users[0]) : new Set(users);
  // filter out already fetched users
  userNames = Array.from(userNames).filter(name => !storedUsers[name]);
  const chunk = 20;
  for (let i = 0, j = userNames.length; i < j; i += chunk) {
    const names = userNames.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.users, { names }))
    .then(({ data }) => {
      dispatch({ type: DATA_USERS, data: arrayToMap(data, 'username') });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch user data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};
