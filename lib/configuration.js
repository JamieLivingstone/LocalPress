const axios = require('axios');
const link = require('url');
const path = require('path');
const R = require('ramda');
const save = require('./save');
const routes = require('./routes.json');

// Utility functions
const isString = url => R.type(url) === "String";
const isObject = input => R.type(input) === "Object";
const objectContains = (property, obj) => R.has(property, obj);
const prefixHttp = url => url.indexOf('http') === -1 ? `http://${url}` : url;

function configuration(websiteUrl) {
    validateUrl(websiteUrl);
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
            objectContains('routes', res.data) &&
            saveConfig(url)
        )
        .catch(e => {
            console.log(e.message.red);
            process.exit();
        })
}

// Save to JSON file
function saveConfig(url) {
    save({url, routes}, 'config.json');
}

module.exports = configuration;