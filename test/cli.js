const expect = require('chai').expect;
const exec = require('child_process').execFile;
const index = './index.js';

describe('CLI', function() {
   it('should display the version when run with the --version flag', function (done) {
       exec('node', [index, '--version'], function (err, stdout) {
           if(err) throw err;
           expect(stdout).to.match(/LocalPress v\d\.\d\.\d\W*$/);
           done();
       });
   });

    it('should display the version when run with the --v flag', function (done) {
        exec('node', [index, '-v'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/LocalPress v\d\.\d\.\d\W*$/);
            done();
        });
    });

    it('should run the help command with -h flag', function (done) {
        exec('node', [index, '-h'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Commands[\w\W]+Options/);
            done();
        });
    });
    
    it('should show the help commands when run without commands or options', function (done) {
        exec('node', [index], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Welcome to LocalPress/);
            done();
        });
    });

    it('should show the help commands when run with an unrecognized command', function (done) {
        exec('node', [index, 'foobar'], function (err, stdout) {
            if(err) throw err;
            expect(stdout).to.match(/Welcome to LocalPress/);
            done();
        });
    });
});