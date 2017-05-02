'use strict';
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');
const {removeSpaces} = require('./helpers');


function run(overrideUrl = '', saveImages = false, chunkFiles = false) {
    let userInput = {url: overrideUrl, routes: {root: '/'}};

    if (!overrideUrl) {
        userInput = loadConfig();
    }

    const routePrefixes = Object.keys(userInput.routes);

    axios.all(createRequests(userInput, routePrefixes))
        .then(data => data.map((req, key) => ({name: routePrefixes[key], body: req.data})))
        .then(endpoints => saveData(endpoints, chunkFiles));
}

function createRequests(userData, prefixes) {
    return prefixes.map(prefix =>
        axios.get(`${removeSpaces(userData.url)}/${userData.routes[prefix]}`));
}

function saveData(endpoints, chunkFiles) {
    if (chunkFiles === false) {
        save(endpoints, 'data.json');
    } else {
        endpoints.forEach(endpoint => save(endpoint, `${endpoint.name}.json`));
    }
}
function processImages(data) {
    console.log(data);
}

module.exports = run;