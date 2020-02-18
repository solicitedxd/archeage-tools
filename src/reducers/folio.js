import {
  FOLIO_INVENTORY,
  FOLIO_MATERIALS,
  FOLIO_QUANTITY,
} from 'constants/folio';
import initialState from 'initialStates/folio';
import { getItem } from 'utils/localStorage';

const folio = (state = getItem('folio', initialState), action) => {
  switch (action.type) {
    case FOLIO_MATERIALS:
      return {
        ...state,
        [action.recipeId]: {
          ...(state[action.recipeId] || {}),
          materials: action.materials,
        },
      };
    case FOLIO_INVENTORY:
      return {
        ...state,
        [action.recipeId]: {
          ...(state[action.recipeId] || {}),
          inventory: action.inventory,
        },
      };
    case FOLIO_QUANTITY:
      return {
        ...state,
        [action.recipeId]: {
          ...(state[action.recipeId] || {}),
          quantity: action.quantity,
        },
      };
    default:
      return state;
  }
};

export default folio;
