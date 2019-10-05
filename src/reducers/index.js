import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dailies from './dailies';
import display from './display';
import notification from './notification';

const rootReducer = (history) => combineReducers({
  dailies,
  display,
  notification,
  router: connectRouter(history),
});

export const getLocalData = {
  dailies: ({ dailies }) => dailies,
};

export default rootReducer;
