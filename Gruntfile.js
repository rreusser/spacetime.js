module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {   
      dist: {
        src: [
          'src/*.js'
        ],
        dest: 'dist/eventable.js',
      }
    },

    uglify: {
      build: {
        src: 'dist/eventable.js',
        dest: 'dist/eventable.min.js'
      }
    },

    watch: {
      scripts: {
        files: ['dist/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      } 
    },

    jasmine: {
      pivotal: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      uses_defaults: ['src/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
