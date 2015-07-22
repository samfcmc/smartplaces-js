module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['lib/parse-1.5.0.js', 'smartplaces.js'],
        dest: 'tmp/smartplaces.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/smartplaces.js': ['tmp/smartplaces.js']
        }
      }
    },
    copy: {
      dist: {
        cwd: 'tmp',
        src: '**',
        dest: 'dist/',
        expand: true,
        filter: 'isFile'
      },
      build: {
        cwd: 'tmp',
        src: '**',
        dest: 'build/',
        expand: true,
        filter: 'isFile'
      },
    },
    clean: {
      tmp: {
        src: ['tmp']
      },
      dist: {
        src: ['dist']
      },
      build: {
        src: ['build']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000
        },
      },
    },
    watch: {
      dev: {
        files: ['**/*.html', '**/*.js'],
        options: {
          livereload: true,
        },
      },
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['concat:dist', 'copy:build', 'clean:tmp']);
  grunt.registerTask('server', ['connect:server', 'watch']);
  grunt.registerTask('dist', ['concat:dist', 'uglify:dist', 'copy:dist', 'clean:tmp']);

};
