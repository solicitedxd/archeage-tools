import {
  SET_CARGO_SHIP,
  SET_REGION,
} from 'constants/schedule';
import initialState from 'initialStates/calendar';
import { getItem } from 'utils/localStorage';

const calendar = (state = getItem('calendar', initialState), action) => {
  switch (action.type) {
    case SET_REGION:
      return {
        ...state,
        regionNA: action.regionNA,
      };
    case SET_CARGO_SHIP:
      return {
        ...state,
        cargoShip: action.cargoShip,
      };
    default:
      return state;
  }
};

export default calendar;
