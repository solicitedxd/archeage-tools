import {
  ADD_TREE,
  DELETE_TREE,
} from 'constants/thunderstruck';
import initialState from 'initialStates/thunderstruck';
import { getItem } from 'utils/localStorage';
import { deepCopy } from 'utils/skills';

const thunderstruck = (state = getItem('thunderstruck', initialState), action) => {
  const trees = deepCopy(state.trees);
  switch (action.type) {
    case ADD_TREE:
      trees.push({ tree: action.tree, time: action.time, note: action.note, climate: action.climate });
      return {
        ...state,
        trees,
      };
    case DELETE_TREE:
      trees.splice(action.index, 1);
      return {
        ...state,
        trees,
      };
    default:
      return state;
  }
};

export default thunderstruck;
