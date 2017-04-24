#!/usr/bin/env node
'use strict';
const yargs = require('yargs');
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
            url: {
                describe: 'URL of website with JSON data',
                demand: false,
                alias: 'u'
            },
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
            doRun(argv.url, argv.images, argv.chunk);
        }
    })

    .version(function () {
        return 'LocalJSON v' + require('./package.json').version.gray;
    })

    .alias('v', 'version')
    .alias('h', 'help')

    .help()
    .argv;

const userCommand = argv._[0];
if (!userCommand || !/^c(fg)?$|^config$|^r(un)?$/i.test(userCommand)) {
    console.log('Welcome to LocalJSON. Here is a list of supported commands:\n'.green);
    yargs.showHelp();
}