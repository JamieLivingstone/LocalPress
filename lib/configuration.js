const axios = require('axios');
const link = require('url')
const path = require('path');
const R = require('ramda');;
const save = require('./save');

// Utility functions
const isString = url => R.type(url) === "String";
const isObject = input => R.type(input) === "Object";
const objectContains = (property, obj) => R.has(obj, property);
const prefixHttp = url => url.indexOf('http') === -1 ? `http://${url}` : url;

// User input
let customPath;

function configuration(folder = '', websiteUrl = '') {
    validateUrl(websiteUrl);
    validatePath(folder);
}

// Validate input is a URL
function validateUrl(url) {
    if (!isString(url) || R.length(url) < 6) {
        console.log('Website URL invalid, please enter url in the format: http://mysite.com'.red);
        process.exit();
    }

    const website = prefixHttp(link.parse(url).href);

    console.log(website);

    mockRequest(`${website}/wp-json/`);
}

// Perform GET request to test network and URL
function mockRequest(url) {
    axios.get(url)
        .then(res =>
            isObject(res.data) &&
            objectContains(res.data, 'routes') &&
            saveConfig(url)
        )
        .catch(e => {
            console.log(e.message.red);
            process.exit();
        })
}

// Validate path input
function validatePath(path) {
    if (!isString(path)) {
        console.log('Custom directory path must be a string!'.red);
        process.exit();
    }

    if(R.length(path) < 1) path = "LocalPress";

    customPath = `${appRoot}/${path}`;
}

// Save to JSON file
function saveConfig(url) {
    save({url, customPath}, customPath, 'config.json');
}

module.exports = configuration;