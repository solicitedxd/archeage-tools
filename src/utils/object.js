/**
 * Checks if there are any properties in an object.
 * @param object{object} the object
 * @returns {boolean} if there are properties
 */
export const objectHasProperties = (object) => countProperties(object) > 0;

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
 * Counts the number of properties an object has.
 * @param obj{object} the object
 * @returns {number} number of properties
 */
export const countProperties = (obj) => obj ? Object.getOwnPropertyNames(obj).length : 0;

/**
 * Calls Object.hasOwnProperty for obj and the property name.
 * @param obj{object} object for search
 * @param propName{string} property name to find
 * @returns {boolean} has property
 */
export const hasProperty = (obj, propName) => Object.prototype.hasOwnProperty.call(obj, propName);
