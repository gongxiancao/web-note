module.exports = function (grunt) {
    'use strict';
    grunt.config.set('jshint', {
        all: ['<%= proj.app %>/js/**/*.js'],

        options: {
            reporter: require('jshint-junit-reporter'),
            reporterOutput: '<%= proj.build %>/reports/lint/jshint-junit.xml',
            jshintrc: '.jshintrc'
        }


    });
};
