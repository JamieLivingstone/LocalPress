const axios = require('axios');
const save = require('./save');
const loadConfig = require('./loadConfig');

function run() {
    const { url, routes} = loadConfig();
    createRequests(url, routes);
}

function createRequests(url, routes) {
    let requests = [];

    for(let route in routes) {
       requests.push(axios.get(url + routes[route]));
    }

    processRequests(requests);
}

function processRequests(requests) {
    axios.all(requests)
        .then(axios.spread((...res) => saveData(res[0].data)))
        .catch(e => console.log(e.message.red));
}

function saveData(data) {
    console.dir(data);
    save(data, 'data.json');
}

module.exports = run;
