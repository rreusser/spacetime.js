module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {   
      dist: {
        src: [
          'src/*.js'
        ],
        dest: 'dist/spacetime.js',
      }
    },

    uglify: {
      build: {
        src: 'dist/spacetime.js',
        dest: 'dist/spacetime.min.js'
      }
    },

    watch: {
      scripts: {
        files: ['dist/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      test: {
        files: ['spec/**/*.js'],
        tasks: ['test'],
        options: {
          spawn: false
        }
      }

    },

    jasmine: {
      spacetime: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js',
      ],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
