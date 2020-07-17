export const objectHasProperties = (object) => object ? Object.getOwnPropertyNames(object).length > 0 : false;

/**
 * Creates a deep copy of an object or array.
 * @param object{object|array} object to copy
 * @returns {object|array} copied object
 */
export const deepCopy = (object) => {
  if (!object) return;
  return JSON.parse(JSON.stringify(object));
};

/**
 * Calls Object.hasOwnProperty for obj and the property name.
 * @param obj{object} object for search
 * @param propName{string} property name to find
 * @returns {boolean} has property
 */
export const hasProperty = (obj, propName) => Object.prototype.hasOwnProperty.call(obj, propName);
