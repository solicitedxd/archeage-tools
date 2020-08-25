import { override as dailiesOverride } from 'initialStates/dailies';
import { override as displayOverride } from 'initialStates/display';
import { override as sessionOverride } from 'initialStates/session';

const overrides = {
  dailies: dailiesOverride,
  display: displayOverride,
  session: sessionOverride,
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const override = (key, object) => {
  if (overrides[key]) {
    return Object.assign(object, overrides[key]);
  }
  return object;
};

export const getItem = (key, initialState) => {
  const value = localStorage.getItem(key);

  if (value) {
    const item = JSON.parse(value);

    if (initialState.version && item.version !== initialState.version) {
      setItem(key, initialState);
      return initialState;
    }

    return override(key, item);
  } else {
    return override(key, initialState);
  }
};
