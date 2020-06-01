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
