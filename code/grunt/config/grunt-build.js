module.exports = function (grunt) {
    'use strict';
    grunt.config.set('buildClient', {
        production: [
            'clean:build',
            'less2css',
            //'csslint',
            'cssmin'
        ],
        dev: [
            'clean:build',
            'less2css:dev',
            'jshint'
        ]
    });
};
