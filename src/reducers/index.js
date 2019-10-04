import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dailies from './dailies';
import notification from './notification';

const rootReducer = (history) => combineReducers({
  dailies,
  notification,
  router: connectRouter(history),
});

export const getLocalData = {
};

export default rootReducer;
