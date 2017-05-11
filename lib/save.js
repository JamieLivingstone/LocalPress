'use strict';
const GLOBALS = require('../globals');
const fs = require('fs');
const path = require('path');
const location = path.resolve(process.cwd() + `/${GLOBALS.name}`);

// Write file to folder
function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log('Saving JSON file to: '.green + path);
    } catch (err) {
        throw new Error('Error saving JSON file: ' + err.message);
    }
}

// Create folder, then write file
function save(data, fileName, folderPath = location) {
    fs.access(folderPath, function (err) {
        if (err) {
            fs.mkdir(folderPath, e => e && console.log(`Error making directory: ${err.message}`.red));
        }

        writeFile(folderPath + '/' + fileName, data);
    });
}

module.exports = save;