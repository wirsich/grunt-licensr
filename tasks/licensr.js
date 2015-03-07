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
      license: 'LICENSE-MIT',
      comment: {
        start: '/*',
        end: '*/',
      },
      matcher: {
        start: /\s*\/\*.*/i,
        end: /\s*\*\//i
      },
      indent: 0
    });

    var str_repeat = function (n, chr) {
      return new Array(n + 1).join(chr);
    };

    var license = grunt.file.read(options.license);
    if (options.indent > 0) {
      var buf = [];
      license.split("\n").forEach(function (line) {
        buf.push(str_repeat(options.indent, " ") + line);
      });
      license = buf.join("\n");
    }

    license = options.comment.start + "\n" + license + options.comment.end + "\n\n";

    var removeHeader = function (contents) {
      var buf = [];
      var started = false;
      var flush = false;
      contents.split("\n").forEach(function (line) {
        if (started && line.match(/.*copyright.*/i)) {
          flush = true;
        }

        if (started && line.match(options.matcher.end)) {
          started = false;
          if (flush === true) {
            flush = false;
            buf = [];
          }
        }

        if (!started && line.match(options.matcher.start)) {
          started = true;
          flush   = false;
        }

        buf.push(line);
      });

      return buf.join("\n");
    };

    this.files.forEach(function(f) {
      var dest = f.dest || undefined;
      var src = f.src;

      var buf = [];
      src.forEach(function (file) {
        var contents = grunt.file.read(file);
        contents = removeHeader(contents);
        contents = license + "\n" + contents;

        if (f.dest) {
          buf.push(contents);
        }
        else {
          dest = file;
          grunt.file.write(dest, contents);
          grunt.log.writeln('File "' + dest + '" created.');
        }
      });

      if (f.dest) {
        grunt.file.write(dest, buf.join(''));
        grunt.log.writeln('File "' + dest + '" created.');
      }
    });
  });

};
