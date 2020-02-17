import { setNotification } from 'actions/notification';
import config from 'config';
import {
  DATA_CATEGORIES,
  DATA_ITEM,
  DATA_VOCATION,
} from 'constants/gameData';
import { NOTIFICATION_TYPE } from 'constants/notification';
import debounce from 'lodash.debounce';
import { arrayToMap } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';
import store from '../store';

const { dispatch } = store;

let itemQueue = new Set();

const fetchItemQueue = debounce(() => {
  dispatch(fetchItems(Array.from(itemQueue)));
  itemQueue = new Set();
}, 50);

export const fetchItem = (itemId) => {
  if (!itemId || itemId === 'undefined') return;
  itemQueue.add(itemId);

  fetchItemQueue();
};

export const fetchItems = (...items) => (dispatch, getState) => {
  const { items: storedItems } = getState().gameData;

  let itemIds = Array.isArray(items[0]) ? new Set(items[0]) : new Set(items);
  // filter out already fetched items
  itemIds = Array.from(itemIds).filter(id => !Boolean(storedItems[id]));
  const chunk = 100;
  for (let i = 0, j = itemIds.length; i < j; i += chunk) {
    const itemIdStr = itemIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.item, { itemIds: itemIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_ITEM, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch item data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const searchItems = (query, searchType) => (dispatch) => new Promise((resolve, reject) => {
  const endpoint = (searchType === 'product') ? config.endpoints.service.searchByProduct
    : config.endpoints.service.searchByMaterial;

  xhr.get(`${endpoint}?query=${encodeURI(query)}`)
  .then(({ data }) => {
    dispatch({ type: DATA_ITEM, data: arrayToMap(data) });
    resolve(data);
  })
  .catch(() => reject());
});

export const searchRecipes = (query, searchType) => (dispatch) => new Promise((resolve, reject) => {
  const endpoint = (searchType === 'product') ? config.endpoints.service.recipeSearchByProduct
    : config.endpoints.service.recipeSearchByMaterial;

  xhr.get(`${endpoint}?query=${encodeURI(query)}`)
  .then(({ data }) => {
    dispatch({ type: DATA_ITEM, data: arrayToMap(data) });
    resolve(data);
  })
  .catch(() => reject());
});

export const fetchRecipeByVocation = (vocation) => new Promise((resolve, reject) => {
  xhr.get(substitute(config.endpoints.service.recipeByVocation, { vocation }))
  .then(({ data }) => resolve(data))
  .catch((error) => reject(error));
});

export const fetchRecipeByProduct = (itemId) => new Promise((resolve, reject) => {
  xhr.get(substitute(config.endpoints.service.recipeByProduct, { itemId }))
  .then(({ data }) => resolve(data))
  .catch((error) => reject(error));
});

export const fetchRecipeByMaterial = (itemId) => new Promise((resolve, reject) => {
  xhr.get(substitute(config.endpoints.service.recipeByMaterial, { itemId }))
  .then(({ data }) => resolve(data))
  .catch((error) => reject(error));
});

export const fetchRecipe = (recipeId) => new Promise((resolve, reject) => {
  if (!recipeId) return;
  xhr.get(substitute(config.endpoints.service.recipe, { recipeId }))
  .then(({ data }) => resolve(data))
  .catch(() => reject());
});

export const fetchVocations = () => (dispatch, getState) => {
  const { vocations } = getState().gameData;

  // don't re-fetch vocation list
  if (vocations.length !== 0) return;

  xhr.get(config.endpoints.service.vocations)
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION, vocations: data });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch vocation data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchCategories = () => (dispatch, getState) => {
  const { categories } = getState().gameData;

  if (objectHasProperties(categories)) return;

  xhr.get(config.endpoints.service.recipeCategories)
  .then(({ data }) => {
    dispatch({ type: DATA_CATEGORIES, categories: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch category data.', NOTIFICATION_TYPE.WARNING));
  });
};
