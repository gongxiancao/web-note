var path = require('path');

module.exports = function (grunt) {
    'use strict';

    var find = require('find');
    grunt.registerTask('less2css', 'Compile less to css', function (buildType) {
        var lessFiles = find.fileSync(/theme\.less$/, grunt.config.data.proj.app);
        lessFiles.push(path.normalize(grunt.config.data.proj.app + '/resources/css/third-party.less'));
        lessFiles.push(path.normalize(grunt.config.data.proj.app + '/app/resources/css/note.less'));
        var size = lessFiles.length;
        var options = {
            paths: [],
            optimization: 1,
            compress: false,
            yuicompress: false
        };
        var files = {};

        for (var i = 0; i < size; i++) {
            var lessFile = lessFiles[i];
            var lessPath =  path.dirname(lessFile);
            options.paths.push(lessPath);
            var cssFile = lessFile.replace('.less', '.css');
            console.log(cssFile);
            if (buildType === 'dev') {
                files[cssFile] = lessFile;
            } else {
                files[grunt.config.data.proj.build + '/' + cssFile] = lessFile;
            }
        }
        grunt.config.set('less', {build: {options: options, files: files}});
        grunt.task.run('less');
    });
};
