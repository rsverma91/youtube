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
        watch: {
            server: {
                files: ['bin/www', 'app.js'],
                tasks: ['develop']
            }
        }
    });
    grunt.registerTask('default', ['develop', 'watch']);
}