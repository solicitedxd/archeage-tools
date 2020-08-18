import { MY_CHARACTERS_DELETE } from 'constants/myGame';
import {
  TAX_ADD,
  TAX_DELETE,
  TAX_HOSTILE,
  TAX_SORT,
} from 'constants/taxes';
import initialState from 'initialStates/taxes';
import { filterByCharacter } from 'utils/array';
import { getItem } from 'utils/localStorage';
import { deepCopy } from 'utils/object';

const taxes = (state = getItem('taxes', initialState), action) => {
  let buildings = deepCopy(state.buildings);
  switch (action.type) {
    case TAX_ADD: {
      buildings.push({
        itemId: action.itemId,
        hostile: action.hostile,
        character: action.character,
      });
      return {
        ...state,
        buildings,
      };
    }
    case TAX_DELETE: {
      buildings.splice(action.index, 1);
      return {
        ...state,
        buildings,
      };
    }
    case TAX_HOSTILE: {
      buildings[action.index].hostile = action.hostile;
      return {
        ...state,
        buildings,
      };
    }
    case TAX_SORT: {
      return {
        ...state,
        sort: action.field,
        direction: action.direction,
      };
    }
    case MY_CHARACTERS_DELETE: {
      buildings = buildings.filter(b => !filterByCharacter(action.id)(b));
      buildings = buildings.map(b => {
        if (b.character > action.id) {
          b.character -= 1;
        }
        return b;
      });
      return {
        ...state,
        buildings,
      };
    }
    default:
      return state;
  }
};

export default taxes;
