export const sortBy = (field, asc = true) => (a, b) => (((a[field] || '') > (b[field] || '')) ? 1 : -1) * (asc ? 1 : -1);

export const arrayToMap = (array) => array.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});
