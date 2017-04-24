'use strict';
const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');

let router = [];
let chunk = false;
let saveImages = false;

function run(overrideUrl, saveImages, chunkFiles) {
    if (chunkFiles === true) {
        chunk = true;
    }

    if(saveImages) {
        saveImages = true;
    }

    if (overrideUrl) {
        createRequests(overrideUrl, ['/']);
    }
    else {
        // Load configuration file
        const {url, routes} = loadConfig();
        createRequests(url, routes);
    }
}

function createRequests(url, routes) {
    let requests = [];

    // Create an axios http GET request instance for each route
    for (let route in routes) {
        if (routes.hasOwnProperty(route)) {
            router.push(route);
            requests.push(axios.get(url + routes[route]));
        }
    }

    processRequests(requests);
}

function processRequests(requests) {
    console.log('Requesting data from routes'.blue);

    axios.all(requests)
        .then(axios.spread((...res) => processData(res)))
        .catch(e => console.log(e.message.red));
}

function processData(data) {
    let obj = {};

    data.forEach((chunk, key) => {
        if(saveImages) {
            processAndSaveImages(chunk.data);
        }

        obj[router[key]] = chunk.data;
    });

    saveData([obj]);
}

function saveData(data) {
    // Save all data to one big json object
    if (chunk === false) {
        return save(data, 'data.json');
    }

    // Chunk files (e.g. home.json, posts.json)
    data.forEach(file => {
        for (let fileName in file) {
            if (file.hasOwnProperty(fileName)) {
                save(file[fileName], `${fileName}.json`);
            }
        }
    });
}

function processAndSaveImages() {

}

module.exports = run;
