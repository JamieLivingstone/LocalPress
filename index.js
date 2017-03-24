#!/usr/bin/env node
var yargs = require('yargs');
var path = require('path');
require('colors');

// Utility functions
var createConfig = require('./lib/configuration');

// Global root path
global.appRoot = path.resolve(__dirname);

// CLI options
var argv = yargs
    .command({
        command: 'config',
        aliases: ['configure', 'cfg', 'c'],
        desc: 'Configure LocalPress options',
        builder: {
            path: {
                describe: 'Specify custom folder to save data into, the default value is "localpress" in the root of the project',
                demand: false,
                alias: 'p'
            },
            url: {
                describe: 'URL of website with Wordpress REST installed (e.g. http://mysite.com)',
                demand: true,
                alias: 'u'
            }
        },
        handler: function (argv) {
            createConfig(argv.path, argv.url);
        }
    })

    .version(function () {
        return 'LocalPress v' + require('./package.json').version.gray;
    })

    .alias('v', 'version')
    .alias('h', 'help')

    .help()
    .argv;

// Show help in case localpress is run without a command or with an unrecognized command
var userCommand = argv._[0];
if (!userCommand || !/^c(fg)?$|^config$|^r(un)?$/i.test(userCommand)) {
    console.log('Welcome to LocalPress. Here is a list of supported commands:\n'.green);
    yargs.showHelp();
}