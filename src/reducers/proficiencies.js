import { PROFICIENCY_UPDATE } from 'constants/proficiencies';
import initialState from 'initialStates/proficiencies';
import { getItem } from 'utils/localStorage';

const proficiencies = (state = getItem('proficiencies', initialState), action) => {
  switch (action.type) {
    case PROFICIENCY_UPDATE:
      const { type, ...other } = action;
      return {
        ...state,
        ...other,
      };
    default:
      return state;
  }
};

export default proficiencies;
