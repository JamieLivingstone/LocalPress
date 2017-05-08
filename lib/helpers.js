'use strict';
const partial = (fn, ...preArgs) => (...laterArgs) => fn(...preArgs, ...laterArgs);
const removeSpaces = input => input.replace(/ /g, '');
const identity = input => input;
const separate = (input, delimiter) => input.split(delimiter);
const isUndefined = input => typeof input === 'undefined';
const match = (regx, str) => {
    const res = str.match(regx);
    return res !== null && str === res[0];
};

// Prefix URLs with http
const prefixHttp = url => url.indexOf('http') === -1 ? `http://${url}` : url;

// Iterate over deeply nested (arrays/objects/values) recursively and call back
const deepIterate = (function deepIterate(input, cb) {
    // Handle arrays
    if (Array.isArray(input)) {
        return input.forEach(item => deepIterate(item));
    }
    // Handle objects
    else if(typeof input === 'object') {
        const keys = Object.keys(input);
        keys.forEach(key => deepIterate(input[key]));
    }
    // Handle numbers and strings
    else if(typeof input === 'string' || typeof input === 'number') {
        cb(input);
    }
});

module.exports = {partial, removeSpaces, identity, separate, isUndefined, match, prefixHttp, deepIterate};