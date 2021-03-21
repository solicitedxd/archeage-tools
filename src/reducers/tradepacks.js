import {
  SET_AH_CUT,
  SET_CRAFT_LARDER,
  SET_DEGRADATION,
  SET_INTEREST,
  SET_OUTLET,
  SET_PACK_REGION,
  SET_PACK_TABLE,
  SET_PERCENTAGE,
  SET_PERCENTAGE_DEFAULT,
  SET_PROFIT_LEVEL,
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
    case SET_PACK_TABLE:
      return {
        ...state,
        packTable: action.packTable,
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
    case SET_PROFIT_LEVEL:
      return {
        ...state,
        profitLevel: {
          ...state.profitLevel,
          [action.packId]: {
            ...pathOr({}, ['profitLevel', action.packId])(state),
            [action.sellZoneId]: action.profit,
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
          [action.packId]: {
            ...pathOr({}, ['percentages', action.packId])(state),
            [action.sellZoneId]: action.percentage,
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
          [action.packId]: action.quantity,
        },
      };
    case SET_WAR:
      return {
        ...state,
        war: {
          ...state.war,
          [action.zoneId]: action.war,
        },
      };
    case SET_SUPPLY:
      return {
        ...state,
        supply: {
          ...state.supply,
          [action.packId]: action.supply,
        },
      };
    case SET_TRANSPORTATION_QUANTITY:
      return {
        ...state,
        transportationQty: {
          ...state.transportationQty,
          [action.originZoneId]: {
            ...pathOr({}, ['transportationQty', action.originZoneId])(state),
            [action.sellZoneId]: {
              ...pathOr({}, ['transportationQty', action.originZoneId, action.sellZoneId])(state),
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
        region: state.region,
      };
    case SET_PACK_REGION:
      return {
        ...state,
        region: action.region,
        packTable: state.packTable,
      };
    default:
      return state;
  }
};

export default tradepacks;
