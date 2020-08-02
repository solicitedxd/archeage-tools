import {
  DATA_CATEGORIES,
  DATA_CROP,
  DATA_DOODAD,
  DATA_EVENT_REPLACE,
  DATA_EVENT_TYPES,
  DATA_EVENTS,
  DATA_FESTIVALS,
  DATA_INSTANCES,
  DATA_ITEM,
  DATA_MOUNTS,
  DATA_NPC,
  DATA_QUEST,
  DATA_QUEST_DAILIES,
  DATA_QUESTCAT,
  DATA_QUESTREF,
  DATA_RECIPE,
  DATA_SKILL,
  DATA_SKILLSETS,
  DATA_TITLE,
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
    case DATA_QUEST:
      return {
        ...state,
        quests: {
          ...state.quests,
          ...action.quests,
        },
      };
    case DATA_QUESTCAT:
      return {
        ...state,
        questCategories: {
          ...state.questCategories,
          ...action.questCategories,
        },
      };
    case DATA_QUESTREF:
      return {
        ...state,
        questCriteriaTypes: action.criteriaTypes,
        rewardTypes: action.rewardTypes,
      };
    case DATA_QUEST_DAILIES:
      return {
        ...state,
        dailyQuests: action.dailies,
      };
    case DATA_FESTIVALS:
      return {
        ...state,
        festivals: action.festivals,
      };
    case DATA_INSTANCES:
      return {
        ...state,
        instances: action.instances,
      };
    case DATA_TITLE:
      return {
        ...state,
        titles: {
          ...state.titles,
          ...action.titles,
        },
      };
    case DATA_NPC:
      return {
        ...state,
        npcs: {
          ...state.npcs,
          ...action.npcs,
        },
      };
    case DATA_DOODAD:
      return {
        ...state,
        doodads: {
          ...state.doodads,
          ...action.doodads,
        },
      };
    default:
      return state;
  }
};

export default gameData;
