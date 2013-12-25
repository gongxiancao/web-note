'use strict';
var match = require('matchdep');

module.exports = function (grunt) {
    // load all grunt tasks
    match.filter('grunt-*', require('./package.json')).forEach(grunt.loadNpmTasks);

    // configurable paths
    var projConfig = {
        app: 'app',
        log: 'log',
        build: 'build',
        server: 'server',
        root: __dirname
    };

    grunt.initConfig({
        proj: projConfig
    });

    grunt.loadTasks('grunt/config/');
    grunt.loadTasks('grunt/tasks/');

};
