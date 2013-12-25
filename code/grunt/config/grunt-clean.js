module.exports = function (grunt) {
    'use strict';
    grunt.config.set('clean', {
        build: ['<%= proj.log %>/*']
    });
};
