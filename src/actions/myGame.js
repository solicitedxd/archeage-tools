import {
  MY_CASTLES,
  MY_CHARACTERS_ADD,
  MY_CHARACTERS_DELETE,
  MY_CHARACTERS_RENAME,
  MY_RESIDENCE,
  MY_SERVER,
} from 'constants/myGame';
import { PROFICIENCY_UPDATE } from 'constants/proficiencies';
import { pathOr } from 'ramda';

export const triggerLocalStorageUpdate = [
  MY_CASTLES,
  MY_CHARACTERS_ADD,
  MY_CHARACTERS_DELETE,
  MY_CHARACTERS_RENAME,
  MY_RESIDENCE,
  MY_SERVER,
  PROFICIENCY_UPDATE,
];

/**
 * Adds a new character.
 * @param name character name
 * @returns {function} redux dispatch call
 */
export const addCharacter = (name) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_ADD, name });
};

/**
 * Deletes a character.
 * @param id character character index
 * @returns {function} redux dispatch call
 */
export const deleteCharacter = (id) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_DELETE, id });
};

/**
 * Renames a character.
 * @param id character index
 * @param name new character name
 * @returns {function} redux dispatch call
 */
export const renameCharacter = (id, name) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_RENAME, id, name });
};

/**
 * Updates my residence.
 * @param e change event
 * @param values array of Autocomplete options.
 * @returns {function} redux dispatch call
 */
export const setResidence = (e, values) => (dispatch) => {
  dispatch({ type: MY_RESIDENCE, residence: values.map(v => v.id || v) });
};

/**
 * Updates my castles.
 * @param e change event
 * @param values array of Autocomplete options.
 * @returns {function} redux dispatch call
 */
export const setCastles = (e, values) => (dispatch) => {
  dispatch({ type: MY_CASTLES, castles: values.map(v => v.id || v) });
};

/**
 * Updates my server.
 * @param e change event
 * @param value server
 * @returns {function} redux dispatch call
 */
export const setServer = (e, value) => (dispatch) => {
  dispatch({ type: MY_SERVER, server: pathOr(null, ['id'])(value) });
};
