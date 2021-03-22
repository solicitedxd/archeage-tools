import {
  MY_CASTLES,
  MY_CHARACTERS_ADD,
  MY_CHARACTERS_DELETE,
  MY_CHARACTERS_RENAME,
  MY_RESIDENCE,
  MY_SERVER,
} from 'constants/myGame';
import { PROFICIENCY_UPDATE } from 'constants/proficiencies';
import initialState from 'initialStates/myGame';
import { getItem } from 'utils/localStorage';
import { deepCopy } from 'utils/object';

const taxes = (state = getItem('myGame', initialState), action) => {
  const stateClone = deepCopy(state);
  switch (action.type) {
    case MY_CHARACTERS_ADD: {
      const { characters } = stateClone;
      characters.push(action.name);
      return {
        ...state,
        characters,
      };
    }
    case MY_CHARACTERS_DELETE: {
      const { characters } = stateClone;
      characters.splice(action.id, 1);
      return {
        ...state,
        characters,
      };
    }
    case MY_CHARACTERS_RENAME: {
      const { characters } = stateClone;
      characters[action.id] = action.name;
      return {
        ...state,
        characters,
      };
    }
    // start saving proficiencies here
    case PROFICIENCY_UPDATE: {
      const { type, ...other } = action;
      return {
        ...state,
        proficiencies: {
          ...state.proficiencies,
          0: {
            ...(state.proficiencies[0] || {}),
            ...other,
          },
        },
      };
    }
    case MY_RESIDENCE: {
      return {
        ...state,
        residence: action.residence,
      };
    }
    case MY_CASTLES: {
      return {
        ...state,
        castles: action.castles,
      };
    }
    case MY_SERVER:
      return {
        ...state,
        server: action.server,
      };
    default:
      return state;
  }
};

export default taxes;
