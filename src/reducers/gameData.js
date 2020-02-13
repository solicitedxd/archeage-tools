import {
  DATA_CATEGORIES,
  DATA_ITEM,
  DATA_RECIPE,
  DATA_VOCATION,
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
        recipes: action.data,
        loaded: action.loaded,
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
