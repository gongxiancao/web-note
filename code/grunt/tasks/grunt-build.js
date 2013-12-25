module.exports = function (grunt) {
	'use strict';

	grunt.registerMultiTask('buildClient', 'Execute build', function () {
		grunt.log.writeln(this.target + ': ' + this.data);
		grunt.task.run(this.data);
	});

	grunt.registerTask('buildSelenium', [
		'exec:build-automation',
		'e2eTests:dev'
	]);
	grunt.registerTask('buildAutomation', [
		'buildClient:dev',
		'buildSelenium'
	]);

	grunt.registerTask('build', [
		'exec:deploy-node-modules',
		'jshint',
		'unit',
		'buildAutomation'
	]);

	grunt.registerTask('buildCI', [
		'jshint',
		'unit'
	]);

};