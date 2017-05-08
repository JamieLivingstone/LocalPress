'use strict';
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');
const {removeSpaces, prefixHttp} = require('./helpers');

function run(overrideUrl = '', saveImages = false, chunkFiles = false) {
    console.log(overrideUrl);
    let config = {
        url: overrideUrl,
        routes: {
            root: '/'
        }
    };

    // Load config if none passed directly
    if (!overrideUrl) {
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
        .catch(e => console.log('Error: ' + e.message.red));
}


function saveData(endpoints, chunkFiles) {
    if (chunkFiles === false) {
        return save(endpoints, 'data.json');
    }
    endpoints.forEach(endpoint => save(endpoint, `${endpoint.name}.json`));
}

module.exports = run;