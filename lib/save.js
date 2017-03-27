const fs = require('fs');

// Write file to folder
function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
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

        writeFile(location + '/' + fileName);
    });
}

module.exports = save;