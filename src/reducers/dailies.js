import {
  QUEST_COLLAPSE_CATEGORY,
  QUEST_FACTION,
  QUEST_FILTER_CONTINENT,
  QUEST_FILTER_REWARD,
  QUEST_FILTER_TYPE,
  QUEST_HIDE,
  QUEST_HIDE_CATEGORY,
  QUEST_HIDE_COMPLETED,
  QUEST_HIDE_MODE,
  QUEST_HIDE_RESET,
  QUEST_LAST_VISIT,
  QUEST_REGION,
  QUEST_RESET,
  QUEST_RESET_FILTERS,
  QUEST_SHOW_HIDDEN,
  QUEST_STATUS,
} from 'constants/dailies';
import initialState from 'initialStates/dailies';
import { getItem } from 'utils/localStorage';

const dailies = (state = getItem('dailies', initialState), action) => {
  switch (action.type) {
    case QUEST_STATUS: {
      const quests = { ...state.quests };
      if (Array.isArray(action.questId)) {
        action.questId.forEach(id => {
          if (action.completed) {
            quests[id] = true;
          } else {
            delete quests[id];
          }
        });
      } else if (action.completed) {
        quests[action.questId] = true;
      } else {
        delete quests[action.questId];
      }
      return {
        ...state,
        quests,
      };
    }
    case QUEST_RESET:
      return {
        ...state,
        quests: {},
      };
    case QUEST_HIDE_COMPLETED:
      return {
        ...state,
        hideComplete: action.hideCompleted,
      };
    case QUEST_FILTER_CONTINENT:
      return {
        ...state,
        continents: action.values,
      };
    case QUEST_FACTION:
      return {
        ...state,
        faction: action.faction,
      };
    case QUEST_REGION:
      return {
        ...state,
        region: action.region,
      };
    case QUEST_FILTER_REWARD:
      return {
        ...state,
        rewards: action.values,
      };
    case QUEST_FILTER_TYPE:
      return {
        ...state,
        types: action.values,
      };
    case QUEST_HIDE: {
      const hiddenQuests = { ...state.hiddenQuests };
      if (action.hidden) {
        hiddenQuests[action.questId] = true;
      } else {
        delete hiddenQuests[action.questId];
      }
      return {
        ...state,
        hiddenQuests,
      };
    }
    case QUEST_HIDE_MODE:
      return {
        ...state,
        hideMode: action.value,
      };
    case QUEST_HIDE_RESET:
      return {
        ...state,
        hiddenQuests: {},
      };
    case QUEST_RESET_FILTERS:
      return {
        ...state,
        continents: [],
        rewards: [],
        types: [],
      };
    case QUEST_HIDE_CATEGORY: {
      const hiddenCategories = { ...state.hiddenCategories };
      if (action.hidden) {
        hiddenCategories[action.categoryId] = true;
      } else {
        delete hiddenCategories[action.categoryId];
      }

      return {
        ...state,
        hiddenCategories,
      };
    }
    case QUEST_COLLAPSE_CATEGORY: {
      const collapseData = {
        ...state.collapsedCategories,
      };
      if (Array.isArray(action.categoryId)) {
        action.categoryId.forEach(catId => {
          if (action.collapsed) {
            collapseData[catId] = true;
          } else {
            delete collapseData[catId];
          }
        });
      } else if (action.collapsed) {
        collapseData[action.categoryId] = true;
      } else {
        delete collapseData[action.categoryId];
      }
      return {
        ...state,
        collapsedCategories: collapseData,
      };
    }
    case QUEST_SHOW_HIDDEN:
      return {
        ...state,
        showHidden: action.showHidden,
      };
    case QUEST_LAST_VISIT:
      return {
        ...state,
        lastVisit: action.lastVisit,
      };
    default:
      return state;
  }
};

export default dailies;
