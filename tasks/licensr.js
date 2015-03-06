/*
 * grunt-licensr
 * https://github.com/wirsich/grunt-licensr
 *
 * Copyright (c) 2015 Stephan Wirsich
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // @TODO use options to set user and year
  // @TODO use settings from package.json and templating to write copyright notice

  grunt.registerMultiTask('licensr', 'dont care about license headers', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      license: 'LICENSE-MIT'
    });

    var license = grunt.file.read(options.license);
    license = '/*' + "\n" + license +'*/';

    var removeHeader = function (contents) {
      var buf = [];
      var started = false;
      var flush = false;
      contents.split("\n").forEach(function (line) {
        buf.push(line);

        if (line.match(/\s*\/\*.*/i)) {
          started = true;
        }
        if (line.match(/.*copyright.*/i) && started && !flush) {
          grunt.log.warn('found copyright => removing', line);
          flush = true;
        }
        if (line.match(/\s*\*\//i)) {
          started = false;

          if (flush === true) {
            buf = [];
          }
        }

      });

      return buf.join("\n");
    };

    // // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var dest = f.dest;
      var src = f.src;

      var buf = [];
      src.forEach(function (file) {
        var contents = grunt.file.read(file);
        contents = removeHeader(contents);
        contents = license + "\n" + contents;
        buf.push(contents);
      });

      grunt.file.write(f.dest, buf.join(''));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
