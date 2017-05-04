'use strict';
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');
const {removeSpaces} = require('./helpers');


function run(overrideUrl = '', saveImages = false, chunkFiles = false) {
    // Override to allow user to run without configuring
    let userInput = {url: overrideUrl, routes: {root: '/'}};

    // Load config if no override
    if (!overrideUrl) { userInput = loadConfig(); }

    // Iterate over routes transforming them to objects and saves the data
    const routePrefixes = Object.keys(userInput.routes);
    axios.all
    (createRequests(userInput, routePrefixes))
        .then(data => data.map((req, key) =>
            ({name: routePrefixes[key], body: req.data}))
        )
        .then(endpoints => saveData(endpoints, chunkFiles));
}

function createRequests(userData, prefixes) {
    return prefixes.map(prefix =>
        axios.get(`${removeSpaces(userData.url)}/${userData.routes[prefix]}`)
            .catch(e => console.log(`Error connecting to ${prefix}. Error: ${e.message}`)));
}

function saveData(endpoints, chunkFiles) {
    if (chunkFiles === false) {
        return save(endpoints, 'data.json');
    }
    endpoints.forEach(endpoint => save(endpoint, `${endpoint.name}.json`));
}

function processImages(data) {
    console.log(data);
}

module.exports = run;