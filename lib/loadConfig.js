const fs = require('fs');
const path = require('path');
const R = require('ramda');

// Utility functions
const isObject = input => R.type(input) === "Object";
const objectContains = (property, obj) => R.has(property, obj);

function validateConfig(userSettings) {
    return isObject(userSettings) && objectContains('url', userSettings) && objectContains('routes', userSettings);
}

function loader() {
    const config = path.resolve(process.cwd()) + '/LocalPress/config.json';
    let userSettings;

    // Attempt to load json config and parse it
    try {
        userSettings = JSON.parse(fs.readFileSync(path.resolve(config), 'utf8'));
    } catch (e) {
        throw new Error('Error loading config file, please run config command again.');
    }

    // Test config for required properties
    if (validateConfig(userSettings)) return userSettings;

    // Fallback if config is invalid
    console.log('Configuration value invalid or corrupt, please run config.'.red)
}

module.exports = loader;