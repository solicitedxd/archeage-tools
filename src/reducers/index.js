import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dailies from './dailies';
import display from './display';
import calendar from './calendar';
import notification from './notification';

const rootReducer = (history) => combineReducers({
  dailies,
  display,
  calendar,
  notification,
  router: connectRouter(history),
});

export const getLocalData = {
  dailies: ({ dailies }) => dailies,
  calendar: ({ calendar }) => calendar,
  display: ({ display }) => display,
};

export default rootReducer;
