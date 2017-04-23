const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';
const mockApi = 'http://google.com';

describe('run', function () {
    it('when run should load config', function (done) {
        exec('node',[index, 'run'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Loading config file/);
            done();
        });
    });

    it('should start requesting data from routes', function (done) {
        exec('node',[index, 'run'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Requesting data from routes/);
            done();
        });
    });
});