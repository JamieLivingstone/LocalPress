const fs = require('fs');
const path = require('path');
const location = path.resolve(process.cwd() + '/LocalPress');

// Write file to folder
function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log('Saving JSON file to: '.green + path.blue);
    } catch (e) {
        throw new Error('Error saving JSON file: ' + e.message);
    }
}

// Create folder, then call write file
function save(obj, fileName) {
    fs.access(location, function (e) {
        if (e && e.code === 'ENOENT') {
            fs.mkdir(location, () => console.log(`Created new folder: ${location}`));
        }

        writeFile(location + '/' + fileName, obj);
    });
}

module.exports = save;