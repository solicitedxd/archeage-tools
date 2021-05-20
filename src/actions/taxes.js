import { MY_CHARACTERS_DELETE } from 'constants/myGame';
import {
  BUILDING_DEPOSIT_REGEX,
  BUILDING_NAME_REGEX,
  BUILDING_SIZE_REGEX,
  BUILDING_TAXES_REGEX,
  BUILDING_TYPE_REGEX,
  TAX_ADD,
  TAX_DELETE,
  TAX_HOSTILE,
  TAX_SORT,
} from 'constants/taxes';

export const triggerLocalStorageUpdate = [
  TAX_ADD,
  TAX_DELETE,
  TAX_HOSTILE,
  TAX_SORT,
  MY_CHARACTERS_DELETE,
];

/**
 * Adds a building to your list of tax buildings.
 * @param itemId{number} itemId for the building
 * @param hostile{boolean} is in hostile land
 * @param character{number} character id that owns it
 * @returns {function} redux dispatch call
 */
export const addBuilding = (itemId, hostile, character) => (dispatch) => {
  dispatch({ type: TAX_ADD, itemId, hostile, character });
};

/**
 * Removes a building from your list of tax buildings.
 * @param index{number} building index
 * @returns {function} redux dispatch call
 */
export const deleteBuilding = (index) => (dispatch) => {
  dispatch({ type: TAX_DELETE, index });
};

/**
 * Marks the hostile status of a building index.
 * @param index{number} building index
 * @param hostile{boolean} is in hostile land
 * @returns {function} redux dispatch call
 */
export const setHostileBuilding = (index, hostile) => (dispatch) => {
  dispatch({ type: TAX_HOSTILE, index, hostile });
};

/**
 * Changes the sorting of your properties list.
 * @param field{string} field name to sort by
 * @param direction{boolean} sort direction; true = asc, false = desc
 * @returns {function}
 */
export const sortBuildings = (field, direction) => (dispatch) => {
  dispatch({ type: TAX_SORT, field, direction });
};

export const createBuilding = (itemId) => (_, getState) => {
  const { items } = getState().gameData;

  const item = items[Number(itemId)];
  if (!item) {
    return null;
  }

  const [, name] = (item.name.match(BUILDING_NAME_REGEX) || [null, null]);
  const [, size] = (item.description.match(BUILDING_SIZE_REGEX) || [null, null]);
  let [, type] = (item.description.match(BUILDING_TYPE_REGEX) || [null, null]);
  const [, deposit] = (item.useEffect.match(BUILDING_DEPOSIT_REGEX) || [null, null]);
  const [, baseTax] = (item.useEffect.match(BUILDING_TAXES_REGEX) || [null, null]);

  if (type === null) {
    if (name.match(/(Farm|Pavilion)/)) {
      type = 'Farm';
    } else if (name.match(/Fellowship/)) {
      type = 'Public Plaza';
    } else if (name.match(/Private/)) {
      type = 'Private Workbench';
    } else if (name.match(/Garden/)) {
      type = 'Small Garden';
    } else if (name.match(/Aquafarm/)) {
      type = 'Marine Farm';
    }
  }
  return {
    itemId: Number(itemId),
    name,
    size: Number(size),
    group: type,
    deposit: Number(deposit),
    baseTax: Number(baseTax),
    exempt: Boolean(name.match(/(((Solar|Lunar|Stellar) (Scarecrow|Pavilion))|Mushroom|Fellowship|Beanstalk) /)),
  };
};
