const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';
const mockApi = 'http://92.60.127.189/~theme/StocksHall';

describe('config', function () {
    it('when given an invalid url to throw an error', function (done) {
        exec('node',[index, 'config', '-u test'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Website URL invalid, please enter url in the format/);
            done();
        });
    });

    it('when given a valid url to show saving message', function (done) {
        exec('node',[index, 'config', `-u ${mockApi}`], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Saving JSON file to/);
            done();
        });
    });
});