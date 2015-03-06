/*
 * grunt-licensr
 * https://github.com/wirsich/grunt-licensr
 *
 * Copyright (c) 2015 Stephan Wirsich
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    licensr: {
      without_header: {
        options: {
          license: 'LICENSE-MIT'
        },
        files: {
          'tmp/mit.js': ['test/fixtures/mit.js']
        }
      },
      with_header: {
        options: {
          license: 'LICENSE-MIT'
        },
        files: {
          'tmp/gpl.js': ['test/fixtures/gpl.js']
        }
      },
      topdoc: {
        options: {
          license: 'LICENSE-MIT',
          comment: {
            start: '//-',
            end: "\n"
          },
          indent: 2
        },
        files: {
          'tmp/topdoc.jade': ['test/fixtures/topdoc.jade']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'licensr', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
