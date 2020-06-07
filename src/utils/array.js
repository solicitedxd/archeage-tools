/**
 * Sort comparator method for comparing objects.
 * @param field{string} field to sort by.
 * @param asc{boolean} true = asc, false = desc
 * @returns {function({object}, {object})}
 */
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

/**
 * Converts an array of objects to a map of object.
 * @param array{array} array of objects
 * @param key{string} key of field to use as map key
 * @returns {object}
 */
export const arrayToMap = (array, key = 'id') => array.reduce((obj, item) => {
  obj[item[key]] = item;
  return obj;
}, {});

/**
 * If the value exists in the array, it will be removed. If it doesn't exist, it pushed.
 * @param array{array}
 * @param value{any}
 */
export const toggleValue = (array, value) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  } else {
    array.push(value);
  }
};
