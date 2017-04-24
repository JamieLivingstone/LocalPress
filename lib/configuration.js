'use strict';
const axios = require('axios');

// Internal dependencies
const save = require('./save');
const routes = require('./routes.json');

function configuration(url) {
    // Prefix url with http and validate
    url = url.indexOf('http') === -1 ? `http://${url}` : url;

    // Test URL for response
    mockRequest(url);
}

// Perform GET request to test network and URL
function mockRequest(url) {
    console.log('Testing the url for a response'.blue);

    axios.get(url)
        .then(() => saveConfig(url))
        .catch(e => {
            console.log(`Error connecting to the URL provided: ${e.message.red}`);
            process.exit();
        });
}

function saveConfig(url) {
    save({url, routes}, 'config.json');
}

module.exports = configuration;