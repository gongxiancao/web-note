module.exports = function (grunt) {
	'use strict';
	grunt.config.set('plato', {
		// Production profile runs yslow with a custom server (Jenkins starts this server on its own)
		options: {
			jshint : grunt.file.readJSON('.jshintrc')
		},
		// Production profile runs yslow with a local standalone server with a QA tomcat nightly deployment backend
		// This profile starts the Express (NodeJS) server by itself
		ui: {
			files: {
				'plato/ui': ['app/js/modules/ui/**/*.js']
			}
		},
		platform: {
			files: {
				'plato/platform': ['app/js/modules/platform/**/*.js']
			}
		},
		note: {
			files: {
				'plato/note': ['app/js/modules/note/**/*.js']
			}
		}
	});
};
