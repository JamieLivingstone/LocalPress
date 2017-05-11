'use strict';
const GLOBALS = require('../globals');
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');
const {removeSpaces, prefixHttp, isUndefined, deepIterate, saveImages} = require('./helpers');

function run(overrideUrl, saveImages = false, chunkFiles = false) {
    // Override config - Allows user to run without running the configuration
    let config = {
        url: overrideUrl,
        routes: [
            {
                prefix: 'root',
                path: ''
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
    const promiseArray = routes.map(route => axios.get(url + route.path));

    // Resolve all promises and save data
    axios.all(promiseArray)
        .then(results =>
            results.map((result) => result.data)
                .map((data, key) => {
                    if (saveImages) {
                        parseImages(data);
                    }
                    return {[routes[key].prefix]: data};
                }))
        .then(output => saveData(output, chunkFiles))
        .catch(e => console.log('Error: ' + e.message.red));
}

// Save images locally - Iterate over deeply nested arrays of objects and save images locally
function parseImages(data) {
    console.log('Parsing images'.green);

    // Take every item from nested arrays/objects and return all strings
    const flattenData = deepIterate(data);
    const imageUrls = flattenData.filter(str => str.match(/^(http[s]?:\/\/.*.(?:png|jpg|gif|svg|jpeg))/i));
    saveImages(imageUrls);
}

// Save file either in chunks e.g. (pages.json, posts.json) or save all into data.json
function saveData(endpoints, chunkFiles) {
    if (chunkFiles === false) {
        return save(endpoints, 'data.json');
    }

    endpoints.forEach(endpoint => save(endpoint, `${endpoint.name}.json`));
}

module.exports = run;