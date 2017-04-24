'use strict';
const fs = require('fs');
const path = require('path');
const location = path.resolve(process.cwd() + '/LocalJson');

// Write file to folder
function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log('Saving JSON file to: '.green + path.blue);
    } catch (err) {
        throw new Error('Error saving JSON file: ' + err.message);
    }
}

// Create folder, then write file
function save(obj, fileName) {
    fs.access(location, function (err) {
        if (err) {
            fs.mkdir(location, e => e && console.log(`Error making directory: ${err.message}`.red));
        }

        writeFile(location + '/' + fileName, obj);
    });
}

module.exports = save;