import {
  QUEST_FILTER_COMPLETE,
  QUEST_FILTER_CONTINENT,
  QUEST_FILTER_FACTION,
  QUEST_FILTER_REWARD,
  QUEST_FILTER_TYPE,
  QUEST_HIDE,
  QUEST_HIDE_MODE,
  QUEST_HIDE_RESET,
  QUEST_RESET,
  QUEST_RESET_FILTERS,
  QUEST_STATUS,
} from 'constants/dailies';
import initialState from 'initialStates/dailies';
import { getItem } from 'utils/localStorage';

const dailies = (state = getItem('dailies', initialState), action) => {
  switch (action.type) {
    case QUEST_STATUS:
      return {
        ...state,
        quests: {
          ...state.quests,
          [action.questId]: action.status,
        },
      };
    case QUEST_RESET:
      return {
        ...state,
        quests: {},
      };
    case QUEST_FILTER_COMPLETE:
      return {
        ...state,
        hideComplete: action.value,
      };
    case QUEST_FILTER_CONTINENT:
      return {
        ...state,
        continents: action.values,
      };
    case QUEST_FILTER_FACTION:
      return {
        ...state,
        faction: action.value,
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
    case QUEST_HIDE:
      return {
        ...state,
        hiddenQuests: {
          ...state.hiddenQuests,
          [action.questId]: action.status,
        },
      };
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
    default:
      return state;
  }
};

export default dailies;
