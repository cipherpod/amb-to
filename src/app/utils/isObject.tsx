/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
/**
 * Checks for valid Object.
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
const isObject = (value: any) => {
  return value !== null && typeof value === 'object' && value instanceof Object && !(value instanceof Array);
};

export default isObject;
