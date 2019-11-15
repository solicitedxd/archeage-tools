import initialState from 'initialStates/tradepacks';
import {
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';
import { getItem } from 'utils/localStorage';

const tradepacks = (state = getItem('tradepacks', initialState), action) => {
  switch (action.type) {
    case SET_PERCENTAGE:
      return {
        ...state,
        percentages: {
          ...state.percentages,
          [action.zone]: {
            ...(state.percentage[action.zone] || {}),
            [action.packType]: action.percentage,
          },
        },
      };
    case SET_PERCENTAGE_DEFAULT:
      return {
        ...state,
        percentage: action.percentage,
      };
    case SET_PROFICIENCY:
      return {
        ...state,
        proficiencies: {
          ...state.proficiencies,
          [action.proficiency]: action.rank,
        },
      };
    case SET_PRICE:
      return {
        ...state,
        prices: {
          ...state.prices,
          [action.item]: action.price,
        },
      };
    case SET_WAR:
      return {
        ...state,
        war: {
          ...state.war,
          [action.zone]: action.war,
        },
      };
    case TRADE_PACK_RESET:
      return initialState;
    default:
      return state;
  }
};

export default tradepacks;
