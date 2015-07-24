module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-bump');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    srcPath: 'src',
    buildPath: 'build',
    distPath: 'dist',
    moduleName: 'smartplaces',
    moduleFile: '<%= moduleName %>.js',
    moduleMinName: 'smartplaces.min',
    moduleMinFile: '<%= moduleMinName %>.js',
    mainName: 'main',
    mainFile: '<%= mainName %>.js',
    bundlePath: 'build',
    browserifyDebug: '<%= grunt.config.get("browserifyDebug") %>',
    destPath: '<%= grunt.config.get("destPath") %>',
    config: {
      dev: {
        options: {
          variables: {
            browserifyDebug: true,
            destPath: 'build'
          }
        }
      },
      dist: {
        options: {
          variables: {
            browserifyDebug: false,
            destPath: 'dist'
          }
        }
      }
    },
    browserify: {
      bundle: {
        src: '<%= srcPath %>/<%= mainFile %>',
        dest: '<%= destPath %>/<%= moduleFile %>',
        options: {
          browserifyOptions:  {
            debug: '<%= browserifyDebug %>'
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= destPath %>/<%= moduleMinFile %>': ['<%= destPath %>/<%= moduleFile %>']
        }
      }
    },
    clean: {
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
      html: {
        files: ['**/*.html'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ['src/**/*.js'],
        options: {
          livereload: true
        },
        tasks: ['dev']
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('common', ['browserify:bundle']);
  grunt.registerTask('dev', ['config:dev', 'common']);
  grunt.registerTask('server', ['dev', 'connect:server', 'watch']);
  grunt.registerTask('dist', ['config:dist', 'common', 'uglify:dist']);
  grunt.registerTask('release', ['dist', 'bump']);

};
