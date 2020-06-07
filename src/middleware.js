import { triggerLocalStorageUpdate as crops } from 'actions/crops';
import { triggerLocalStorageUpdate as dailies } from 'actions/dailies';
import { triggerLocalStorageUpdate as display } from 'actions/display';
import { triggerLocalStorageUpdate as folio } from 'actions/folio';
import { triggerLocalStorageUpdate as itemPrice } from 'actions/itemPrice';
import { triggerLocalStorageUpdate as mounts } from 'actions/mounts';
import { triggerLocalStorageUpdate as proficiencies } from 'actions/proficiencies';
import { triggerLocalStorageUpdate as calendar } from 'actions/schedule';
import { triggerLocalStorageUpdate as tradepacks } from 'actions/tradepacks';
import { routerMiddleware } from 'connected-react-router';
import { triggerLocalStorageUpdate as session } from 'constants/session';
import { getLocalData } from 'reducers';
import thunk from 'redux-thunk';
import { setItem } from 'utils/localStorage';

const keysAndActionTypes = {
  dailies,
  calendar,
  crops,
  display,
  folio,
  itemPrice,
  mounts,
  proficiencies,
  session,
  tradepacks,
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
