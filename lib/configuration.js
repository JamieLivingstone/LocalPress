const axios = require('axios');
const path = require('path');
const R = require('ramda');
const url = require("url");
require('colors');

// Utility functions
const isString = url => R.type(url) === "String";
const isArray = input => R.type(input) === "Array";

// Validate input is a URL
function validateUrl(url) {
    let validUrl = isString(url) && R.length(url) > 5;

    if(!validUrl) {

    }

    mockRequest(url);
}

// Perform request to test network and URL
function mockRequest(url) {
    axios.get(url)

        .then(res => isArray(res.data))

        .catch(e => {
            console.error('Website URL invalid, please enter url in the format: http://mysite.com'.red);
            process.exit();
        })
}


function configuration(path = global.appRoot, websiteUrl) {
    let website = `http://${url.parse(websiteUrl).hostname}`;
    validateUrl(website);
}

module.exports = configuration;