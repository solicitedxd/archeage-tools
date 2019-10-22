import {
  ADD_TREE,
  DELETE_TREE,
} from 'constants/thunderstruck';

export const triggerLocalStorageUpdate = [
  ADD_TREE,
  DELETE_TREE,
];

export const addTree = (tree, time, climate, note) => (dispatch) => {
  dispatch({ type: ADD_TREE, tree, time, climate, note });
};

export const removeTree = (index) => (dispatch) => {
  dispatch({ type: DELETE_TREE, index });
};

