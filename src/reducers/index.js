import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notification from './notification';

const rootReducer = (history) => combineReducers({
  notification,
  router: connectRouter(history),
});

export const getLocalData = {
};

export default rootReducer;
