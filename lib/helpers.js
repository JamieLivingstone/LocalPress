'use strict';
const isString = input => typeof input === 'string';
const isUndefined = input => typeof input === 'undefined';
const partial = (fn, ...preArgs) => (...laterArgs) => fn(...preArgs, ...laterArgs);
const removeSpaces = input => isString(input) && input.replace(/ /g, '');
const identity = input => input;
const separate = (input, delimiter) => input.split(delimiter);
const match = (regx, str) => {
    const res = str.match(regx);
    return res !== null && str === res[0];
};

// Prefix URLs with http
const prefixHttp = url => isString(url) && url.indexOf('http') === -1 ? `http://${url}` : url;

function deepIterate(input) {
    let results = [];

    (function recurse(input) {
        // Handle arrays
        if (Array.isArray(input)) {
            return input.forEach(item => recurse(item));
        }
        // Handle objects
        else if(typeof input === 'object') {
            const keys = Object.keys(input);
            keys.forEach(key => recurse(input[key]));
        }
        // Handle numbers and strings
        else if(typeof input === 'string' || typeof input === 'number') {

        }
    })(input);

    console.log('Results are', results);
}

module.exports = {partial, removeSpaces, identity, separate, isUndefined, isString, match, prefixHttp, deepIterate};