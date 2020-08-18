import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import calendar from './calendar';
import crops from './crops';
import dailies from './dailies';
import display from './display';
import folio from './folio';
import gameData from './gameData';
import itemPrice from './itemPrice';
import mounts from './mounts';
import myGame from './myGame';
import notification from './notification';
import proficiencies from './proficiencies';
import session from './session';
import taxes from './taxes';
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
  myGame,
  notification,
  proficiencies,
  router: connectRouter(history),
  session,
  crops,
  taxes,
  tradepacks,
  users,
});

export default rootReducer;
