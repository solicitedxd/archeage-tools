import { hasProperty } from 'utils/object';
import { slug } from 'utils/string';

/**
 * Sort comparator method for comparing objects.
 * @param field{string} field to sort by.
 * @param asc{boolean} true = asc, false = desc
 * @returns {function({object}, {object})}
 */
export const sortBy = (field, asc = true) => (a, b) => {
  if (a === undefined) {
    return 1;
  }

  if (b === undefined) {
    return -1;
  }

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
 * Sort by number.
 * @param a{number}
 * @param b{number}
 * @returns {number}
 */
export const sortNumber = (a, b) => a - b;

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
 * Reduce the mounts array into an object, combine mounts by name.
 * @param mounts{array}
 * @returns {object}
 */
export const reduceMounts = (mounts) => {
  return mounts.reduce((obj, mount) => {
    const key = slug(mount.name);
    if (hasProperty(obj, key)) {
      obj[key].push(mount);
    } else {
      obj[key] = [mount];
    }
    return obj;
  }, {});
};

/**
 * Convert an array of objects into a map of key-value pairs.
 * @param array{array}
 * @param key{string}
 * @param value{string}
 * @returns {object}
 */
export const mapValue = (array, key = 'id', value = 'value') => array.reduce((obj, item) => {
  obj[item[key]] = item[value];
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
