#!/usr/bin/env nodejs
'use strict';
const yargs = require('yargs');
const GLOBALS = require('./globals');
const {createFolder} = require('./lib/helpers');
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
            },
            routes: {
                describe: 'A comma separated list of routes. e.g: home: /, posts: /posts, news: /news/',
                demand: false,
                alias: 'r'
            }
        },
        handler: function (argv) {
            createFolder('LocalPress');
            createConfig(argv.url, argv.routes);
        }
    })

    .command({
        command: 'run',
        aliases: ['run', 'r'],
        desc: `Run ${GLOBALS.name} downloader`,
        builder: {
            url: {
                describe: 'URL of the website',
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
                alias: 'c'
            }
        },
        handler: function (argv) {
            doRun(argv.url, argv.images, argv.chunk);
        }
    })

    .version(function () {
        return `${GLOBALS.name} v` + require('./package.json').version.gray;
    })

    .alias('v', 'version')
    .alias('h', 'help')

    .help()
    .argv;

const userCommand = argv._[0];
if (!userCommand || !/^c(fg)?$|^config$|^r(un)?$/i.test(userCommand)) {
    console.log(`Welcome to ${GLOBALS.name}. Here is a list of supported commands:\n`.green);
    yargs.showHelp();
}