'use strict';
const axios = require('axios');
const save = require('./save');
const {partial, separate, removeSpaces, match} = require('./helpers');

//Helper functions
const validRoute = partial(match, /[a-zA-Z0-9_'=&-]*@[a-zA-Z0-9_'=&\/-]*/);
const prefixHttp = url => url.indexOf('http') === -1 ? `http://${url}` : url;

function configuration(url, routes = 'root@/') {
    url = removeSpaces(prefixHttp(url));

    // Format routes
    routes = separate(removeSpaces(routes), ',');

    // Throw error if any invalid routes are passed through
    if (routes.filter(validRoute).length < routes.length) {
        console.log('Invalid routes detected! Enter routes in the format: --routes "about:/about, contact:/contact-us"'.red);
        process.exit();
    }

    // Convert routes to objects for saving
    routes = routes.map(route => {
       let keyValue = route.split('@');
       return { prefix: keyValue[0], path: keyValue[1] };
    });

    // Send mock request and save config
    mockRequest(url, routes);
}

function mockRequest(url, routes) {
    const testUrl = url + routes[0].path;
    console.log(`Testing the URL for a response: ${testUrl}`.yellow);

    axios.get(testUrl)
        .then(() => console.log('Connected to url successfully!'))
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