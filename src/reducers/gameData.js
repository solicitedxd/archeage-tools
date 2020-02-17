import {
  DATA_CATEGORIES,
  DATA_ITEM,
  DATA_RECIPE,
  DATA_VOCATION,
  DATA_VOCATION_RECIPE,
} from 'constants/gameData';
import initialState from 'initialStates/gameData';

const gameData = (state = initialState, action) => {
  switch (action.type) {
    case DATA_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.data,
        },
      };
    case DATA_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          ...action.data,
        },
      };
    case DATA_VOCATION_RECIPE:
      return {
        ...state,
        vocationRecipes: {
          ...state.vocationRecipes,
          [action.vocation]: action.recipes,
        },
      };
    case DATA_VOCATION:
      return {
        ...state,
        vocations: action.vocations,
      };
    case DATA_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return state;
  }
};

export default gameData;
