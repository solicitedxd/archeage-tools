export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, initialState) => {
  const value = localStorage.getItem(key);

  if (value) {
    const item = JSON.parse(value);

    if (initialState.version && item.version !== initialState.version) {
      setItem(key, initialState);
      return initialState;
    }

    return item;
  } else {
    return initialState;
  }
};
