const path = require('path');
const R = require('ramda');
const url = require("url");
require('colors');

// Utility functions
const fetch = require('./fetch');
const save = '';

let isString = url => R.type(url) === "String";

function configuration(path = global.appRoot, websiteUrl) {
    let website = url.parse(websiteUrl).hostname;

    let validUrl = isString(website) && R.length(website) > 5;

    if(!validUrl) {
        console.error('Website URL invalid, please enter url in the format: http://mysite.com'.red);
        process.exit();
    }

    let validResponse = validateUrlResponse(url);

    if(validResponse) {
        save();
    }
}

// Make a mock request to the server and validate its running WP Rest API
async function validateUrlResponse(url) {
    let response = await fetch(url);
}

module.exports = configuration;