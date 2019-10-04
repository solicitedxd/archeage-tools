import {
  QUEST_FILTER_COMPLETE,
  QUEST_FILTER_CONTINENT,
  QUEST_FILTER_FACTION,
  QUEST_FILTER_REWARD,
  QUEST_FILTER_TYPE,
  QUEST_RESET,
  QUEST_STATUS,
} from 'constants/dailies';

export const setQuestStatus = (questId, status) => (dispatch) => {
  dispatch({ type: QUEST_STATUS, questId, status });
};

export const resetQuests = () => (dispatch) => {
  dispatch({ type: QUEST_RESET });
};

export const filterComplete = (value) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_COMPLETE, value });
};

export const filterFaction = (value) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_FACTION, value });
};

export const filterContinents = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_CONTINENT, values });
};

export const filterRewards = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_REWARD, values });
};

export const filterTypes = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_TYPE, values });
};
