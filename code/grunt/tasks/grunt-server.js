module.exports = function (grunt) {
	'use strict';

    grunt.registerTask('server', 'Start server.', function() {
    	this.async();
        require(grunt.config.data.proj.root + '/' + grunt.config.data.proj.server + '/server.js');
    });
};