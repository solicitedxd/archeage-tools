import {
  DATA_CATEGORIES,
  DATA_CROP,
  DATA_EVENT_REPLACE,
  DATA_EVENT_TYPES,
  DATA_EVENTS,
  DATA_ITEM,
  DATA_MOUNTS,
  DATA_RECIPE,
  DATA_SKILL,
  DATA_SKILLSETS,
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
    case DATA_CROP:
      return {
        ...state,
        crops: action.crops,
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
        subCategories: action.subCategories,
      };
    case DATA_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case DATA_EVENT_REPLACE:
      return {
        ...state,
        events: {
          ...state.events,
          [action.event.id]: action.event,
        },
      };
    case DATA_EVENT_TYPES:
      return {
        ...state,
        eventTypes: action.eventTypes,
      };
    case DATA_SKILL:
      return {
        ...state,
        skills: {
          ...state.skills,
          ...action.data,
        },
      };
    case DATA_SKILLSETS:
      return {
        ...state,
        skillsets: action.skillsets,
        classes: action.classes,
      };
    case DATA_MOUNTS:
      return {
        ...state,
        mounts: {
          mounts: action.mounts,
          types: action.mountTypes,
          obtainTypes: action.obtainTypes,
        },
      };
    default:
      return state;
  }
};

export default gameData;
