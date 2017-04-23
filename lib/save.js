const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const location = path.resolve(process.cwd() + '/JsonDownload');

// Write file to folder
function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log('Saving JSON file to: '.green + path.blue);
    } catch (e) {
        throw new Error('Error saving JSON file: ' + e.message);
    }
}

// Create folder, then write file
function save(obj, fileName) {
    fs.access(location, function (e) {
        if (e) fs.mkdir(location, e => e && console.log(`Error making directory: ${e.message}`.red));
        writeFile(location + '/' + fileName, obj);
    });
}

module.exports = save;