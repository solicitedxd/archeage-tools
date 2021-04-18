import {
  ADD_CROP,
  DELETE_CROP,
  MARK_CROP,
  RESTART_CROP,
} from 'constants/crops';
import initialState from 'initialStates/crops';
import { getItem } from 'utils/localStorage';
import { deepCopy } from 'utils/object';

const crops = (state = getItem('crops', initialState), action) => {
  const crops = deepCopy(state);
  switch (action.type) {
    case ADD_CROP:
      crops.push({
        crop: action.crop,
        time: action.time,
        note: action.note,
        climate: action.climate,
        timer: action.timer,
        seedbed: action.seedbed,
      });
      return crops;
    case DELETE_CROP:
      crops.splice(action.index, 1);
      return crops;
    case RESTART_CROP:
      crops[action.index] = {
        ...crops[action.index],
        time: action.time,
        timer: action.timer,
        mark: false,
      };
      return crops;
    case MARK_CROP:
      crops[action.index] = {
        ...crops[action.index],
        mark: action.mark,
      };
      return crops;
    default:
      return state;
  }
};

export default crops;
