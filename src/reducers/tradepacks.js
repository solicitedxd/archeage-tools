import {
  SET_AH_CUT,
  SET_CONTINENT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_FRESHNESS,
  SET_INTEREST,
  SET_OUTLET,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_QUANTITY,
  SET_SUPPLY,
  SET_TRANSPORTATION_QUANTITY,
  SET_WAR,
  TRADE_PACK_RESET,
} from 'constants/tradepacks';
import initialState from 'initialStates/tradepacks';
import { pathOr } from 'ramda';
import { getItem } from 'utils/localStorage';

const tradepacks = (state = getItem('tradepacks', initialState), action) => {
  switch (action.type) {
    case SET_CONTINENT:
      return {
        ...state,
        continent: action.continent,
      };
    case SET_OUTLET:
      return {
        ...state,
        outlet: action.outlet,
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
    case SET_TRANSPORTATION_QUANTITY:
      return {
        ...state,
        transportationQty: {
          ...state.transportationQty,
          [action.originZone]: {
            ...pathOr({}, ['transportationQty', action.originZone])(state),
            [action.sellZone]: {
              ...pathOr({}, ['transportationQty', action.originZone, action.sellZone])(state),
              [action.item]: action.value,
            },
          },
        },
      };
    case SET_AH_CUT:
      return {
        ...state,
        ahCut: {
          ...state.ahCut,
          [action.itemId]: action.cut,
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
