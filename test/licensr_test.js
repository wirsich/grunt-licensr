'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.licensr = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  with_header: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/gpl.js');
    var expected = grunt.file.read('test/expected/gpl.js');
    test.equal(actual, expected, 'should succeed if output is correct from a file with a copyright header.');

    test.done();
  },
  without_header: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/mit.js');
    var expected = grunt.file.read('test/expected/mit.js');
    test.equal(actual, expected, 'should succeed if output is correct from a file without a copyright header.');

    test.done();
  },
  topdoc: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/topdoc.jade');
    var expected = grunt.file.read('test/expected/topdoc.jade');
    test.equal(actual, expected, 'should succeed if output is a topdoc-wrapped copyright header.');

    test.done();
  },
};
