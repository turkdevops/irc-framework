"use strict";
/*globals describe, it */
let chai = require('chai'),
    MessageTags = require('../src/messagetags'),
    expect = chai.expect,
    assert = chai.assert;

chai.use(require('chai-subset'));

describe('src/messagetags.js', function () {
    describe('value encoding', function () {

        it('should decode characters to correct strings', function () {
            let plain = "Some people use IRC; others don't \\o/ Note: Use IRC\r\n";
            let encoded = "Some\\speople\\suse\\sIRC\\:\\sothers\\sdon't\\s\\\\o/\\sNote:\\sUse\\sIRC\\r\\n";

            assert.equal(MessageTags.decodeValue(encoded), plain);
        });

        it('should encode characters to correct strings', function () {
            let plain = "Some people use IRC; others don't \\o/ Note: Use IRC\r\n";
            let encoded = "Some\\speople\\suse\\sIRC\\:\\sothers\\sdon't\\s\\\\o/\\sNote:\\sUse\\sIRC\\r\\n";

            assert.equal(MessageTags.encodeValue(plain), encoded);
        });
    });

    describe('parsing', function () {

        it('should decode tag string into an object', function () {
            let plain = 'foo=bar;baz;';
            let tags = MessageTags.decode(plain);
            expect(tags).to.containSubset({
                foo: 'bar',
                baz: true
            });
        });

        it('should decode a tag string into an object with correct characters', function () {
            let plain = 'foo=bar;baz;name=prawn\\ssalad';
            let tags = MessageTags.decode(plain);
            expect(tags).to.containSubset({
                foo: 'bar',
                baz: true,
                name: 'prawn salad',
            });
        });
    });
});
