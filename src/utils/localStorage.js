import { override as dailiesOverride } from 'initialStates/dailies';

const overrides = {
  dailies: dailiesOverride,
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, initialState) => {
  const value = localStorage.getItem(key);

  if (value) {
    const item = JSON.parse(value);

    if (overrides[key]) {
      return Object.assign(item, overrides[key]);
    }

    return item;
  } else {
    return initialState;
  }
};
