const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');

let router = [];
let chunk = true;

function run(saveImages, chunkFiles) {
    const {url, routes} = loadConfig();
    if (chunkFiles === true) chunk = true;
    createRequests(url, routes);
}

function createRequests(url, routes) {
    let requests = [];

    for (let route in routes) {
        router.push(route);
        requests.push(axios.get(url + routes[route]));
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
        obj[router[key]] = chunk.data;
    });

    saveData([obj]);
}

function saveData(data) {
    // Save all data to one big json object
    if (chunk === false) {
        return save(data, 'data.json');
    }

    // Chunk to files by name
    data.forEach(file => {
        for (let fileName in file) {
            save(file[fileName], `${fileName}.json`);
        }
    })
}

module.exports = run;
