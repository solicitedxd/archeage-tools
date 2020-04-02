import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import calendar from './calendar';
import dailies from './dailies';
import display from './display';
import folio from './folio';
import gameData from './gameData';
import itemPrice from './itemPrice';
import mounts from './mounts';
import notification from './notification';
import proficiencies from './proficiencies';
import session from './session';
import thunderstruck from './thunderstruck';
import tradepacks from './tradepacks';
import users from './users';

const rootReducer = (history) => combineReducers({
  dailies,
  display,
  calendar,
  folio,
  gameData,
  itemPrice,
  mounts,
  notification,
  proficiencies,
  router: connectRouter(history),
  session,
  thunderstruck,
  tradepacks,
  users,
});

export const getLocalData = {
  dailies: ({ dailies }) => dailies,
  calendar: ({ calendar }) => calendar,
  display: ({ display }) => display,
  folio: ({ folio }) => folio,
  itemPrice: ({ itemPrice }) => itemPrice,
  mounts: ({ mounts }) => mounts,
  proficiencies: ({ proficiencies }) => proficiencies,
  session: ({ session }) => session,
  thunderstruck: ({ thunderstruck }) => thunderstruck,
  tradepacks: ({ tradepacks }) => tradepacks,
};

export default rootReducer;
