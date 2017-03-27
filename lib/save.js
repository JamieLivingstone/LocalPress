const fs = require('fs');

function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        console.log('Saving JSON file to: '.green + path.blue);
    } catch (e) {
        throw new Error('Error saving JSON file: ' + e.message);
    }
}

function save(obj, path, fileName) {
    fs.access(path, function (e) {
        if (e && e.code === 'ENOENT') {
            fs.mkdir(path, () => console.log(`Created new folder: ${path}`));
        }

        writeFile(`${path}/${fileName}`, obj);
    });
}

module.exports = save;