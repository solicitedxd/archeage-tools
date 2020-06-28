import { setNotification } from 'actions/notification';
import config from 'config';
import {
  DATA_CATEGORIES,
  DATA_CROP,
  DATA_EVENT_REPLACE,
  DATA_EVENT_TYPES,
  DATA_EVENTS,
  DATA_ITEM,
  DATA_MOUNTS,
  DATA_RECIPE,
  DATA_SKILL,
  DATA_SKILLSETS,
  DATA_VOCATION,
  DATA_VOCATION_RECIPE,
} from 'constants/gameData';
import { NOTIFICATION_TYPE } from 'constants/notification';
import debounce from 'lodash.debounce';
import {
  arrayToMap,
  mapValue,
  reduceMounts,
} from 'utils/array';
import {
  hasProperty,
  objectHasProperties,
} from 'utils/object';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';
import store from '../store';

const { dispatch } = store;

/** Item Batching **/
let itemQueue = new Set();

const fetchItemQueue = debounce(() => {
  dispatch(fetchItems(Array.from(itemQueue)));
  itemQueue = new Set();
}, 50);

export const fetchItem = (itemId) => {
  if (!itemId || itemId === 'undefined' || typeof itemId !== 'number') return;
  itemQueue.add(itemId);

  fetchItemQueue();
};

export const fetchItems = (...items) => (dispatch, getState) => {
  const { items: storedItems } = getState().gameData;

  let itemIds = Array.isArray(items[0]) ? new Set(items[0]) : new Set(items);
  // filter out already fetched items
  itemIds = Array.from(itemIds).filter(id => !storedItems[id]);
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

export const fetchCropItems = () => (dispatch, getState) => {
  const { crops } = getState().gameData;

  // do not fetch again
  if (crops.length > 0) return;

  xhr.get(config.endpoints.service.itemCrops)
  .then(({ data: cropIds }) => {
    dispatch(fetchItems(cropIds));
    dispatch({ type: DATA_CROP, crops: cropIds });
  });
};

/** Recipe Batching **/
let recipeQueue = new Set();

const fetchRecipeQueue = debounce(() => {
  dispatch(fetchRecipes(Array.from(recipeQueue)));
  recipeQueue = new Set();
}, 50);

export const fetchRecipe = (recipeId) => {
  if (!recipeId || recipeId === 'undefined') return;
  recipeQueue.add(recipeId);

  fetchRecipeQueue();
};

export const fetchRecipes = (...recipes) => (dispatch, getState) => {
  const { recipes: storedRecipes } = getState().gameData;

  let recipeIds = Array.isArray(recipes[0]) ? new Set(recipes[0]) : new Set(recipes);
  // filter out already fetched recipes
  recipeIds = Array.from(recipeIds).filter(id => !storedRecipes[id]);
  const chunk = 100;
  for (let i = 0, j = recipeIds.length; i < j; i += chunk) {
    const recipeIdStr = recipeIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.recipe, { recipeIds: recipeIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_RECIPE, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch recipe data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const searchRecipes = (query, searchType) => (dispatch, getState) => {
  const endpoint = (searchType === 'product') ? config.endpoints.service.recipeSearchByProduct
    : config.endpoints.service.recipeSearchByMaterial;

  const key = `${searchType}-${query}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(`${endpoint}?query=${encodeURI(query)}`)
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByVocation = (vocation) => (dispatch, getState) => {
  if (hasProperty(getState().gameData.vocationRecipes, vocation)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByVocation, { vocation }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByProduct = (itemId) => (dispatch, getState) => {
  const key = `product-${itemId}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByProduct, { itemId }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByMaterial = (itemId) => (dispatch, getState) => {
  const key = `material-${itemId}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByMaterial, { itemId }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByCategory = (category, subCat1, subCat2) => (dispatch, getState) => {
  const key = `category-${category}-${subCat1}-${subCat2}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByCategory, { category, subCat1, subCat2 }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

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
    dispatch({ type: DATA_CATEGORIES, categories: arrayToMap(data.categories), subCategories: arrayToMap(data.types) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch category data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchEventTypes = () => (dispatch, getState) => {
  const { eventTypes } = getState().gameData;

  if (objectHasProperties(eventTypes)) return;

  xhr.get(config.endpoints.service.eventTypes)
  .then(({ data }) => {
    dispatch({ type: DATA_EVENT_TYPES, eventTypes: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch event type data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchEvents = () => (dispatch, getState) => {
  const { events } = getState().gameData;

  if (objectHasProperties(events)) return;

  xhr.get(config.endpoints.service.events)
  .then(({ data }) => {
    dispatch({ type: DATA_EVENTS, events: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch events data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const setEvent = (event) => (dispatch) => {
  dispatch({ type: DATA_EVENT_REPLACE, event });
};

/** Skill Batching **/

let skillQueue = new Set();

const fetchSkillQueue = debounce(() => {
  dispatch(fetchSkills(Array.from(skillQueue)));
  skillQueue = new Set();
}, 50);

export const fetchSkill = (skillId) => {
  if (!skillId || skillId === 'undefined') return;
  skillQueue.add(skillId);

  fetchSkillQueue();
};

export const fetchSkills = (...skills) => (dispatch, getState) => {
  const { skills: storedSkills, skillsets } = getState().gameData;

  if (!objectHasProperties(skillsets)) {
    dispatch(fetchSkillsets());
  }

  let skillIds = Array.isArray(skills[0]) ? new Set(skills[0]) : new Set(skills);
  // filter out already fetched skills
  skillIds = Array.from(skillIds).filter(id => !storedSkills[id]);
  const chunk = 100;
  for (let i = 0, j = skillIds.length; i < j; i += chunk) {
    const skillIdStr = skillIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.skills, { skillIds: skillIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_SKILL, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch skill data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const fetchSkillsets = () => (dispatch, getState) => {
  const { skillsets } = getState().gameData;

  if (objectHasProperties(skillsets)) return;

  xhr.get(config.endpoints.service.skillsets)
  .then(({ data: skillsets }) => {
    xhr.get(config.endpoints.service.classes)
    .then(({ data: classes }) => {
      dispatch({ type: DATA_SKILLSETS, skillsets: arrayToMap(skillsets), classes });
    });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch skillset data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const findClassName = (skillsetIds) => (_, getState) => {
  const { classes, skillsets } = getState().gameData;

  const classObj = classes.find(c => c.skillsetIds.every(skillSet => skillsetIds.includes(skillSet)));

  if (classObj) {
    return classObj.name;
  } else {
    console.error('Class not found for skillsets: ', skillsetIds, skillsetIds.map(ski => skillsets[ski].name));
  }
};

export const getSkillsets = () =>
  dispatch((_, getState) => {
    const { skillsets } = getState().gameData;
    return skillsets;
  });

export const fetchMounts = () => (dispatch, getState) => {
  const { mounts } = getState().gameData;

  if (mounts.mounts.length > 0) return;

  xhr.get(config.endpoints.service.mounts)
  .then(({ data: mounts }) => {
    xhr.get(config.endpoints.service.mountTypes)
    .then(({ data: mountTypes }) => {
      xhr.get(config.endpoints.service.mountObtainTypes)
      .then(({ data: obtainTypes }) => {
        dispatch({
          type: DATA_MOUNTS,
          mounts: reduceMounts(mounts),
          mountTypes: mapValue(mountTypes, 'id', 'name'),
          obtainTypes: arrayToMap(obtainTypes),
        });
      })
      .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
    })
    .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
  })
  .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
};
