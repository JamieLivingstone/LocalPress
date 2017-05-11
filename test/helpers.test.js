'use strict';
const expect = require('chai').expect;
const exec = require('child_process').execFile;
const {partial, removeSpaces, identity, separate, isUndefined, isString, match, prefixHttp, deepIterate} = require('../lib/helpers');

describe('helpers', function () {
    it('should allow later args in partial', () => {
        const addFive = partial(function add(x, y) {
            return x + y;
        }, 5);

        const result = addFive(5);
        expect(result).to.equal(10);
    });

    it('should remove spaces when a string is passed to removeSpaces()', () => {
        expect(removeSpaces('foo b a r')).to.equal('foobar');
    });

    it('should return is-self when identity() is called', () => {
        expect(identity(4)).to.equal(4);
    });

    it('should return an array when seperate() is passed a string', () => {
        const programmingLanguages = separate('JavaScript|PHP|C#', '|');
        expect(programmingLanguages).to.eql(['JavaScript', 'PHP', 'C#']);
    });

    it('should return true if value is undefined when passed to isUndefined()', () => {
        expect(isUndefined(undefined)).to.be.true;
    });

    it('should return false if value is not undefined when passed to isUndefined()', () => {
        expect(isUndefined(5)).to.be.false;
        expect(isUndefined('foo')).to.be.false;
        expect(isUndefined({a: 1})).to.be.false;
        expect(isUndefined([1, 2, 3])).to.be.false;
    });

    it('should return true when string is passed to isString()', () => {
        expect(isString('test')).to.be.true;
    });

    it('should return false when a none string is passed to isString()', () => {
        expect(isString(5)).to.be.false;
        expect(isString({foo: 'bar'})).to.be.false;
        expect(isString(['buzz'])).to.be.false;
    });

    it('should return true when the regex is a match in match()', () => {
        expect(match(/test/, 'test')).to.equal(true);
    });

    it('should return false when the regex is not a match in match()', () => {
        expect(match(/buzz/, 'foo bar')).to.equal(false);
    });

    it('if the url does not contain a prefix, it should prefix it with http://', () => {
        expect(prefixHttp('google.com')).to.equal('http://google.com');
    });

    it('if the url contains http or https it should return the url back', () => {
        expect(prefixHttp('https://google.com')).to.equal('https://google.com');
        expect(prefixHttp('http://facebook.co.uk')).to.equal('http://facebook.co.uk');
    });

    it('should iterate over deeply nested data structures and return all strings', () => {
        const complexDataStructure = [
            [
                {
                    test: [{
                        age: 20,
                        locations: ['Manchester']
                    }]
                },
                {
                    albums: [
                        {
                            someAlbum: [
                                {
                                    name: 'myAlbum'
                                }
                            ]
                        }
                    ]
                }
            ]
        ];

        expect(deepIterate(complexDataStructure)).to.eql(['Manchester', 'myAlbum']);
    });
});