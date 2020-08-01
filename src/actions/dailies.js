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
import moment from 'moment-timezone';

export const triggerLocalStorageUpdate = [
  QUEST_COLLAPSE_CATEGORY,
  QUEST_FACTION,
  QUEST_FILTER_CONTINENT,
  QUEST_FILTER_REWARD,
  QUEST_FILTER_TYPE,
  QUEST_HIDE,
  QUEST_HIDE_CATEGORY,
  QUEST_HIDE_COMPLETED,
  QUEST_HIDE_RESET,
  QUEST_LAST_VISIT,
  QUEST_REGION,
  QUEST_RESET,
  QUEST_SHOW_HIDDEN,
  QUEST_STATUS,
];

/**
 * Sets a quest's completed status.
 * @param questId{number|array} quest id
 * @param completed{boolean} completed status
 * @returns {function} redux dispatch call
 */
export const setQuestStatus = (questId, completed) => (dispatch) => {
  dispatch({ type: QUEST_STATUS, questId, completed });
};

/**
 * @deprecated
 * @returns {function(...[*]=)}
 */
export const resetQuests = () => (dispatch) => {
  dispatch({ type: QUEST_RESET });
};

/**
 * Toggles the display of completed quests.
 * @param hideCompleted{boolean} show status
 * @returns {function} redux dispatch call
 */
export const setHideCompleted = (hideCompleted) => (dispatch) => {
  dispatch({ type: QUEST_HIDE_COMPLETED, hideCompleted });
};

/**
 * Sets faction to filter quests.
 * @param faction{number} faction id
 * @returns {function} redux dispatch call
 */
export const setQuestFaction = (faction) => (dispatch) => {
  dispatch({ type: QUEST_FACTION, faction });
};

/**
 * Sets the publisher region to filter quests.
 * @param region{string} region code
 * @returns {function} redux dispatch call
 */
export const setQuestRegion = (region) => (dispatch) => {
  dispatch({ type: QUEST_REGION, region });
};

/**
 * @deprecated
 * @returns {function}
 */
export const filterContinents = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_CONTINENT, values });
};

/**
 * @deprecated
 * @param values
 * @returns {function}
 */
export const filterRewards = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_REWARD, values });
};

/**
 * @deprecated
 * @returns {function(...[*]=)}
 */
export const filterTypes = (values) => (dispatch) => {
  dispatch({ type: QUEST_FILTER_TYPE, values });
};

/**
 * Sets the hide status of a quest.
 * @param questId{number} quest id
 * @param hidden{boolean} hide status
 * @returns {function} redux dispatch call
 */
export const setQuestHide = (questId, hidden) => (dispatch) => {
  dispatch({ type: QUEST_HIDE, questId, hidden });
};

/**
 * @deprecated
 * @returns {function(...[*]=)}
 */
export const setHideMode = (value) => (dispatch) => {
  dispatch({ type: QUEST_HIDE_MODE, value });
};

/**
 * @deprecated
 * @returns {function(...[*]=)}
 */
export const resetHide = () => (dispatch) => {
  dispatch({ type: QUEST_HIDE_RESET });
};

/**
 * @deprecated
 * @returns {function(...[*]=)}
 */
export const resetFilters = () => (dispatch) => {
  dispatch({ type: QUEST_RESET_FILTERS });
};

/**
 * Toggles the showing of hidden categories and content.
 * @param showHidden{boolean} show hidden status
 * @returns {function} redux dispatch call
 */
export const setShowHidden = (showHidden) => (dispatch) => {
  dispatch({ type: QUEST_SHOW_HIDDEN, showHidden });
};

/**
 * Set the hide status of a category.
 * @param categoryId{string|number} category
 * @param hidden{boolean} hide status
 * @returns {function} redux dispatch call
 */
export const setHideCategory = (categoryId, hidden) => (dispatch) => {
  dispatch({ type: QUEST_HIDE_CATEGORY, categoryId, hidden });
};

/**
 * Sets the collapse status of a category.
 * @param categoryId{string|number} category
 * @param collapsed{boolean} collapse status
 * @returns {function} redux dispatch call
 */
export const setCollapseCategory = (categoryId, collapsed) => (dispatch) => {
  dispatch({ type: QUEST_COLLAPSE_CATEGORY, categoryId, collapsed });
};

/**
 * Updates the lastVisit timestamp for the daily page.
 * @returns {function} redux dispatch call
 */
export const updateLastVisit = () => (dispatch) => {
  dispatch({ type: QUEST_LAST_VISIT, lastVisit: moment.utc() });
};
