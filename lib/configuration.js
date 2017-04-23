const axios = require('axios');
const path = require('path');

// Internal dependencies
const save = require('./save');
const routes = require('./routes.json');

function configuration(url) {
    // Prefix url with http if non existent
    var isValidUrl = validateUrl(url.indexOf('http') === -1 ? `http://${url}` : url);

    if(!isValidUrl) return console.log('Website URL invalid, please enter url in the format');

    // Test URL for response
    mockRequest(url);
}

function validateUrl(url) {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
    return !!url.match(urlRegex);
}

// Perform GET request to test network and URL
function mockRequest(url) {
    console.log('Testing the url for a response'.blue);

    axios.get(url)
        .then(() => saveConfig(url))
        .catch(e => {
            console.log(`Error connecting to the URL provided: ${e.message.red}`);
            process.exit();
        })
}

function saveConfig(url) {
    save({url, routes}, 'config.json');
}

module.exports = configuration;