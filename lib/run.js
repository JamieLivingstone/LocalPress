'use strict';
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');
const {removeSpaces, prefixHttp, isUndefined} = require('./helpers');

function run(overrideUrl, saveImages = false, chunkFiles = false) {
    // Override config - Allows user to run without running the configuration
    let config = {
        url: overrideUrl,
        routes: [
            {
                prefix: 'root',
                path: '/'
            }
        ]
    };

    // Load config if none passed directly
    if (isUndefined(overrideUrl)) {
        config = loadConfig();
    }

    // Create requests data
    const url = removeSpaces(prefixHttp(config.url));
    const routes = config.routes;

    // Array of promises of each route
    const promiseArray = routes.map(route => axios.get(`${url}${route.path}`));

    // Resolve all promises and save data
    axios.all(promiseArray)
        .then(results =>
            results.map((result) => result.data)
                .map((data, key) => ({[routes[key].prefix]: data})))
        .then(output => saveData(output, chunkFiles))
        .catch(e => console.log('Error connecting to URLs: ' + e.message.red));
}

// Save images locally - Iterate over deeply nested arrays of objects and save images locally
function parseImages(data) {


    return nestedData;
}

// Save file either in chunks e.g. (pages.json, posts.json) or save all into data.json
function saveData(endpoints, chunkFiles) {
    if (chunkFiles === false) {
        return save(endpoints, 'data.json');
    }
    endpoints.forEach(endpoint => save(endpoint, `${endpoint.name}.json`));
}

module.exports = run;