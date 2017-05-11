'use strict';
const GLOBALS = require('../globals');
const fs = require('fs');
const path = require('path');

function validateConfig(userSettings) {
    return typeof userSettings === 'object' && userSettings.hasOwnProperty('url') && userSettings.hasOwnProperty('routes');
}

function loader() {
    const config = path.resolve(process.cwd()) + `/${GLOBALS.name}/config/config.json`;
    let userSettings;

    // Attempt to load json config and parse it
    try {
        console.log('Loading config file');
        userSettings = JSON.parse(fs.readFileSync(path.resolve(config), 'utf8'));
    } catch (e) {
        throw new Error('Error loading config file, please run config command again.');
    }

    // Test config for required properties
    if (validateConfig(userSettings)) {
        return userSettings;
    }

    // Fallback if config is invalid
    console.log('Configuration value invalid or corrupt, please run config.'.red)
}

module.exports = loader;