import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dailies from './dailies';
import display from './display';
import calendar from './calendar';
import notification from './notification';
import thunderstruck from './thunderstruck';
import tradepacks from './tradepacks';

const rootReducer = (history) => combineReducers({
  dailies,
  display,
  calendar,
  notification,
  router: connectRouter(history),
  thunderstruck,
  tradepacks,
});

export const getLocalData = {
  dailies: ({ dailies }) => dailies,
  calendar: ({ calendar }) => calendar,
  display: ({ display }) => display,
  thunderstruck: ({ thunderstruck }) => thunderstruck,
  tradepacks: ({ tradepacks }) => tradepacks,
};

export default rootReducer;
