export const sortBy = (field, asc = true) => (a, b) => {
  if (a[field] === b[field]) {
    return 0;
  }

  if (a[field] === null) {
    return 1;
  }

  if (b[field] === null) {
    return -1;
  }

  return (a[field] > b[field] ? 1 : -1) * (asc ? 1 : -1);
};

export const arrayToMap = (array) => array.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});
