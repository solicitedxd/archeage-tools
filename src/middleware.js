import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { triggerLocalStorageUpdate as dailies } from 'actions/dailies';
import { setItem } from 'utils/localStorage';
import { getLocalData } from 'reducers';

const keysAndActionTypes = {
  dailies,
};

const updateLocalAfterActions = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  Object.keys(keysAndActionTypes).forEach((key) => {
    const actionTypes = keysAndActionTypes[key];
    if (actionTypes.includes(action.type)) {
      setItem(key, getLocalData[key](state));
    }
  });

  return result;
};

export default (history) => [
  routerMiddleware(history),
  thunk,
  updateLocalAfterActions,
]
