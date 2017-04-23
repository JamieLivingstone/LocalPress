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
        desc: 'Configure url options',
        builder: {
            url: {
                describe: 'URL of website with JSON data',
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
            },
            chunk: {
                describe: 'Separate data into multiple files e.g. pages.json, posts.json',
                demand: false,
                aliases: 'chunk'
            }
        },
        handler: function (argv) {
            doRun(argv.images, argv.chunk);
        }
    })

    .version(function () {
        return 'json-download v' + require('./package.json').version.gray;
    })

    .alias('v', 'version')
    .alias('h', 'help')

    .help()
    .argv;

const userCommand = argv._[0];
if (!userCommand || !/^c(fg)?$|^config$|^r(un)?$/i.test(userCommand)) {
    console.log('Welcome to json-download. Here is a list of supported commands:\n'.green);
    yargs.showHelp();
}