'use strict';
var match = require('matchdep');

module.exports = function (grunt) {
    // load all grunt tasks
    match.filter('grunt-*', require('./package.json')).forEach(grunt.loadNpmTasks);

    // configurable paths
    var gruntConfig = {
        paths: {
            app: 'app',
            log: 'log',
            build: 'build',
            server: 'server',
            root: __dirname
        },
        buildClient: {
            production: [
                'clean:build_log',
                'clean:build',
                'copy:build_app_assets',
                'copy:build_vendor_assets',
                'less2css',
                'jshint'
                //'csslint',
                //'cssmin'
            ],
            dev: [
                'clean:build_log',
                'clean:build',
                'copy:build_app_assets',
                'copy:build_vendor_assets',
                'less2css:dev',
                'jshint'
            ]
        },
        clean: {
            build_log: ['<%= paths.log %>'],
            build: ['<%= paths.build %>']
        },
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= paths.build %>/',
                        cwd: '<%= paths.app %>/',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= paths.build %>/vendor',
                        cwd: '<%= paths.root %>',
                        expand: true,
                        flatten: true
                    }
                ]
            },
        },

        jshint: {
            all: ['<%= paths.app %>/js/**/*.js'],

            options: {
                reporter: require('jshint-junit-reporter'),
                reporterOutput: '<%= paths.build %>/reports/lint/jshint-junit.xml',
                jshintrc: '.jshintrc'
            }
        },
        plato: {
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
        }

    };

    var userConfig = require('./build.config.js');
    grunt.initConfig(grunt.util._.extend(gruntConfig, userConfig));

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

    var find = require('find'),
        path = require('path');


    grunt.registerTask('less2css', 'Compile less to css', function (buildType) {

        var lessFiles = find.fileSync(/theme\.less$/, grunt.config.data.paths.app);

        lessFiles.push(path.normalize(grunt.config.data.paths.app + '/resources/css/third-party.less'));
        lessFiles.push(path.normalize(grunt.config.data.paths.app + '/app/resources/css/note.less'));
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
                files[grunt.config.data.paths.build + '/' + cssFile] = lessFile;
            }
        }
        grunt.config.set('less', {build: {options: options, files: files}});
        grunt.task.run('less');
    });

    grunt.registerTask('server', 'Start server.', function() {
        this.async();
        require(grunt.config.data.paths.root + '/' + grunt.config.data.paths.server + '/server.js');
    });
};
