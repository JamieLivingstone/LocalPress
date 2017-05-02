'use strict';
const axios = require('axios');

// Internal dependencies
const save = require('./save');
const {partial, separate, removeSpaces, match} = require('./helpers');
const validRoute = partial(match, /[a-zA-Z0-9_'=&-]+[@{1}][a-zA-Z0-9_'=&-]+/);

function configuration(url, routes = 'root@/') {
    // Prefix url with http and validate
    url = url.indexOf('http') === -1 ? `http://${url}` : url;

    // Format routes
    routes = separate(removeSpaces(routes), ',');

    // Throw error if any invalid routes are passed through
    if (routes.filter(validRoute).length < routes.length) {
        console.error('Invalid routes detected, please format routes like this: "home@/, "about@/about"'.red);
        process.exit();
    }

    // Convert routes to objects for saving
    routes = routes.map(route => {
       let keyValue = route.split('@');
       return { prefix: keyValue[0], path: keyValue[1] };
    });

    // Test URL for response
    mockRequest(url, routes);
}

// Perform GET request to test network and URL
function mockRequest(url, routes) {
    console.log('Testing the url for a response'.blue);

    const testUrl = url + routes[0].path;
    console.log(testUrl);

    axios.get(testUrl)
        .then(() => saveConfig(url, routes))
        .catch(e => {
            console.log(`Error connecting to the URL provided: ${e.message.red}`);
            process.exit();
        });
}

function saveConfig(url, routes) {
    save({url, routes}, 'config.json');
}

module.exports = configuration;