'use strict';
const partial = (fn, ...preArgs) => (...laterArgs) => fn(...preArgs, ...laterArgs);
const removeSpaces = input => input.replace(/ /g, '');
const identity = input => input;
const separate = (input, delimiter) => input.split(delimiter);
const match = (regx, str) => regx.test(str);

module.exports = {partial, removeSpaces, identity, separate, match};