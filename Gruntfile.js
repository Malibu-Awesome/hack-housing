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
        src:['css/**/*', '*.html','image/*',
        '../bower_components/bootstrap/dist/css/bootstrap.min.css',
        '../bower_components/bootstrap/dist/js/bootstrap.min.js',
        'js/*.js'
        ],
        dest:'dist/'
        },
        ]
      }
    },

    // copy: {
    //   main:{
    //     files:[
    //     {
    //     expand: true,
    //     flatten: true,
    //     cwd:'app/',
    //     src:['bower_components/bootstrap/*',

    //     ],
    //     dest:'dist/bootstrap/'
    //     },
    //     ]
    //   }
    // },

    browserify: {
      standalone: {
        src: ['app/js/app.js'],
        dest: 'dist/client.js'
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: ['app/**/*.html', 'app/**/*.css'],
        tasks: ['copy']
      },

      js: {
        files: 'app/**/*.js',
        tasks: ['browserify']
      },

      express: {
        files: ['server.js', 'api/**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
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
  grunt.registerTask('build', ['clean', 'browserify:standalone', 'copy']);
};
