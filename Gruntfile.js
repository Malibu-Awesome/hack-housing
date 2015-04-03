'use strict';

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    copy: {
      main:{
        files:[
        {
        expand: true,
        flatten: true,
        cwd:'app/',
        src:['css/**/*.css'],
        dest:'dist/'
        },
        ]
      }
    },
    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      app: {
        src: 'app/app.js',
        dest: 'dist/client.js'
      }
    },
    watch: {
      options: {
        livereload: true
      }
    },
    express: {
      dev: {
        options: {
          background: true,
          script: 'server.js',
          port: 4000
        }
      }
    }
  });
  grunt.registerTask('server', ['express:dev', 'build', 'watch']);
  grunt.registerTask('build', ['clean', 'browserify:app', 'copy']);
};
