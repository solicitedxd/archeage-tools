import {
  MY_CHARACTERS_ADD,
  MY_CHARACTERS_DELETE,
  MY_CHARACTERS_RENAME,
} from 'constants/myGame';
import { PROFICIENCY_UPDATE } from 'constants/proficiencies';

export const triggerLocalStorageUpdate = [
  MY_CHARACTERS_ADD,
  MY_CHARACTERS_DELETE,
  MY_CHARACTERS_RENAME,
  PROFICIENCY_UPDATE,
];

export const addCharacter = (name) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_ADD, name });
};

export const deleteCharacter = (id) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_DELETE, id });
};

export const renameCharacter = (id, name) => (dispatch) => {
  dispatch({ type: MY_CHARACTERS_RENAME, id, name });
};
