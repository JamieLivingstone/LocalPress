'use strict';
const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';
const mockApi = 'http://google.com';

describe('config', function () {
    it('when given an invalid url to throw an error', function (done) {
        exec('node',[index, 'config', '-u fgfg@'], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Error connecting to the URL provided/);
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

    it('should give an error when a valid url passed but website is unreachable', function (done) {
        exec('node', [index, 'config', `-u www.foobarbuzz.com`], function (err, stdout) {
            if(err) { throw err; }
            expect(stdout).to.match(/Error connecting to the URL provided/);
            done();
        });
    });
});