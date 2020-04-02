import {
  FOLIO_INVENTORY,
  FOLIO_MATERIALS,
  FOLIO_QUANTITY,
} from 'constants/folio';

export const triggerLocalStorageUpdate = [
  FOLIO_INVENTORY,
  FOLIO_MATERIALS,
  FOLIO_QUANTITY,
];

export const updateFolioMaterials = (recipeId, materials) => (dispatch) => {
  dispatch({ type: FOLIO_MATERIALS, recipeId, materials });
};

export const updateFolioInventory = (recipeId, inventory) => (dispatch) => {
  dispatch({ type: FOLIO_INVENTORY, recipeId, inventory });
};

export const updateFolioQuantity = (recipeId, quantity) => (dispatch) => {
  dispatch({ type: FOLIO_QUANTITY, recipeId, quantity });
};
