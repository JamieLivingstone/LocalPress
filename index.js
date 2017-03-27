#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
require('colors');

// Utility functions
const createConfig = require('./lib/configuration');
const doRun = require('./lib/run');

// CLI options
const argv = yargs
    .command({
        command: 'config',
        aliases: ['configure', 'cfg', 'c'],
        desc: 'Configure LocalPress options',
        builder: {
            url: {
                describe: 'URL of website with Wordpress REST installed (e.g. http://mysite.com)',
                demand: true,
                alias: 'u'
            }
        },
        handler: function (argv) {
            createConfig(argv.url);
        }
    })

    .command({
        command: 'run',
        aliases: ['run', 'r'],
        desc: 'Get all WordPress pages, posts and media',
        builder: {
            images: {
                describe: 'Save images to local directory',
                demand: false,
                alias: 'i'
            }
        },
        handler: function (argv) {
            doRun(argv.images);
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
const userCommand = argv._[0];
if (!userCommand || !/^c(fg)?$|^config$|^r(un)?$/i.test(userCommand)) {
    console.log('Welcome to LocalPress. Here is a list of supported commands:\n'.green);
    yargs.showHelp();
}