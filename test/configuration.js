'use strict';
const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';
const mockApi = 'http://google.com';

describe('config', function () {
    it('when given an invalid url to throw an error', function (done) {
        exec('node',[index, 'config', '-u foo'], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Website URL invalid, please enter url in the format/);
            done();
        });
    });

    it('when given a valid url to show saving message', function (done) {
        exec('node',[index, 'config', `-u ${mockApi}`], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Testing the url for a response/);
            done();
        });
    });

    it('should give an error when passed an invalid url', function (done) {
        exec('node', [index, 'config', `-u bar`], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Website URL invalid, please enter url in the format/);
            done();
        });
    });

    it('should give an error when a valid url passed but website is unreachable', function (done) {
        exec('node', [index, 'config', `-u www.foobarbuzz.com`], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Error connecting to the URL provided/);
            done();
        });
    });
});