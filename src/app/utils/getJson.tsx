/**
 * Converts JSON string to string
 *
 * @param {string} value
 *
 * @returns {string}
 */
const valueJSON = (value: string): string => {
  return value.replace(/["{}\[\]]/g, '').replace(/^\s+/m, '');
};

export default valueJSON;
