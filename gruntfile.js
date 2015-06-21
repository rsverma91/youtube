'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        develop: {
            server: {
                file: 'bin/www'
            }
        },
        uglify: {
            dist: {
                files: {
                    "public/js/index.min.js": ['public/js/libs/jquery.js', 'public/js/libs/master.js', 'public/js/search.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/css/index.min.css': 'public/css/*.css'
                }
            }
        },
        watch: {
            server: {
                files: ['bin/www', 'app.js'],
                tasks: ['develop']
            }
        },
    });
    grunt.registerTask('default', ['develop', 'uglify', 'cssmin', 'watch']);
}