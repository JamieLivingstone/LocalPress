'use strict';
const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';

describe('config', function () {
   // Test for invalid URLs
    it('should throw an error when given an invalid url', function (done) {
        exec('node', [index, 'config', '-u fgfg@'], function (err, stdout) {
            if (err) {
                throw err;
            }
            expect(stdout).to.match(/Error connecting to the URL provided/);
            done();
        });
    });

    // Connect valid URLs
    it('should connect when URL is valid', function (done) {
        exec('node', [index, 'config', '-u google.com'], function (err, stdout) {
            if (err) {
                throw err;
            }
            expect(stdout).to.match(/Testing the URL for a response/);
            done();
        });
    });

    // Error for invalid routes
    it('should display errors for invalid routes', function (done) {
        exec('node', [index, 'config', '-u google.com', '-r foo:bar'], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Invalid routes detected! Enter routes in the format/);
            done();
        });
    });

    // Connect with valid Routes
    it('should test url if routes are valid', function (done) {
        exec('node', [index, 'config', '-u google.com', '-r foo:bar'], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Invalid routes detected! Enter routes in the format/);
            done();
        });
    });
});