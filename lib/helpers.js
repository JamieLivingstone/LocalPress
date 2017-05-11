'use strict';
const GLOBALS = require('../globals');
const download = require('image-downloader');
const fs = require('fs');

// Helpers
const isString = input => typeof input === 'string';
const isUndefined = input => typeof input === 'undefined';
const partial = (fn, ...preArgs) => (...laterArgs) => fn(...preArgs, ...laterArgs);
const removeSpaces = input => isString(input) && input.replace(/ /g, '');
const identity = input => input;
const separate = (input, delimiter) => input.split(delimiter);

// Prefix URLs with http if non present
const prefixHttp = url => isString(url) && url.indexOf('http') === -1 ? `http://${url}` : url;

// Regex simplified for method chaining
const match = (regx, str) => {
    const res = str.match(regx);
    return res !== null && str === res[0];
};

// Iterate recursively over deeply nested data structures and return all strings
function deepIterate(input) {
    let results = [];

    (function recurse(input) {
        // Handle arrays
        if (Array.isArray(input)) {
            return input.forEach(item => recurse(item));
        }
        // Handle objects
        else if (input !== null && typeof input === 'object') {
            const keys = Object.keys(input);
            return keys.forEach(key => recurse(input[key]));
        }

        // Handle primitives
        else if (typeof input === 'string' && input.length > 0) {
            results.push(input);
        }
    })(input);

    return results;
}

// Create a folder
function createFolder(location) {
    fs.access(location, function (err) {
        if (err) {
            fs.mkdir(location, e => e && console.log(`Error making directory: ${err.message}`.red));
            return false;
        }

        return true;
    });
}

// Save an image from a URL
function saveImages(imageUrls) {
    // Create folder to contain images
    createFolder(GLOBALS.imageFolder);

    // Prevent duplicate images
    let imagesToSave = [];

    // Create an array of promises
    imageUrls.forEach(image => {
        if (imagesToSave.indexOf(image) === -1) {
            imagesToSave.push(image);
        }
    });

    // Save images
    imagesToSave.forEach(url => {
        // Get filename from url http://someurl.com/FILENAME_FROM_HERE.jpg
        const fileName = url.match(/([a-zA-Z0-9-_]*).(?:png|jpg|gif|svg|jpeg)/g)[0];

        // Download and save all images
        download.image({url, dest: GLOBALS.imageFolder + fileName})
            .then(() => console.log(`Saved Image: ${fileName}`.green))
            .catch(err => console.log(`Could not save: ${fileName}`.red));
    });
}

module.exports = {
    partial,
    removeSpaces,
    identity,
    separate,
    isUndefined,
    isString,
    match,
    prefixHttp,
    deepIterate,
    saveImages,
    createFolder
};