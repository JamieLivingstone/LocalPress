'use strict';
const partial = (fn, ...preArgs) => (...laterArgs) => fn(...preArgs, ...laterArgs);
const removeSpaces = input => input.replace(/ /g, '');
const identity = input => input;
const separate = (input, delimiter) => input.split(delimiter);
const match = (regx, str) => {
    const res = str.match(regx);
    return res !== null && str === res[0];
};
const prefixHttp = url => url.indexOf('http') === -1 ? `http://${url}` : url;

module.exports = {partial, removeSpaces, identity, separate, match, prefixHttp};