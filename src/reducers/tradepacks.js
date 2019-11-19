import { pathOr } from 'ramda';
import initialState from 'initialStates/tradepacks';
import {
  SET_CONTINENT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PRICE,
  SET_PROFICIENCY,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';
import { getItem } from 'utils/localStorage';

const tradepacks = (state = getItem('tradepacks', initialState), action) => {
  switch (action.type) {
    case SET_CONTINENT:
      return {
        ...state,
        continent: action.continent,
      };
    case SET_CRAFT_LARDER:
      return {
        ...state,
        craftLarder: action.craftLarder,
      };
    case SET_DEGRADATION:
      return {
        ...state,
        degradeDemand: action.degradeDemand,
      };
    case SET_FRESHNESS:
      return {
        ...state,
        freshness: {
          ...state.freshness,
          [action.originZone]: {
            ...pathOr({}, ['freshness', action.originZone])(state),
            [action.packType]: {
              ...pathOr({}, ['freshness', action.originZone, action.packType])(state),
              [action.sellZone]: action.profit,
            },
          },
        },
      };
    case SET_INTEREST:
      return {
        ...state,
        showInterest: action.showInterest,
      };
    case SET_PERCENTAGE:
      return {
        ...state,
        percentages: {
          ...state.percentages,
          [action.originZone]: {
            ...pathOr({}, ['percentages', action.originZone])(state),
            [action.packType]: {
              ...pathOr({}, ['percentages', action.originZone, action.packType])(state),
              [action.sellZone]: action.percentage,
            },
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
    case SET_QUANTITY:
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.originZone]: {
            ...pathOr({}, ['quantities', action.originZone])(state),
            [action.packType]: action.quantity,
          },
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
    case SET_SUPPLY:
      return {
        ...state,
        supply: {
          ...state.supply,
          [action.originZone]: action.supply,
        },
      };
    case TRADE_PACK_RESET:
      return {
        ...initialState,
        continent: state.continent,
        proficiencies: state.proficiencies,
      };
    default:
      return state;
  }
};

export default tradepacks;
