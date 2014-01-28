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
            build_log: 'build_log',
            compile: 'bin',
            server: 'server',
            root: __dirname
        },
        pkg: grunt.file.readJSON('package.json'),
        buildClient: {
            production: [
                'clean:build_log',
                'clean:build',
                'copy:build_app_assets',
                'copy:build_vendor_assets',
                'copy:build_vendor_js',
                'less2css',
                'jshint',
                'index'
                //'csslint',
                //'cssmin'
            ],
            dev: [
                'clean:build_log',
                'clean:build',
                'copy:build_app_assets',
                'copy:build_vendor_assets',
                'copy:build_vendor_js',
                'less2css:dev',
                'jshint',
                'index'
            ]
        },
        clean: {
            build_log: ['<%= paths.build_log %>'],
            build: ['<%= paths.build %>']
        },
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= paths.build %>',
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
            build_vendor_js: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= paths.build %>',
                        cwd: '<%= paths.root %>',
                        expand: true
                    }
                ]
            },
        },

        jshint: {
            all: [
                '<%= paths.app %>/js/**/*.js',
                '<%= paths.server/**/*.js'
            ],

            options: {
                reporter: require('jshint-junit-reporter'),
                reporterOutput: '<%= paths.build_log %>/reports/lint/jshint-junit.xml',
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
        },
        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= paths.build %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= app_files.js %>',
                    //'<%= paths.build %>/**/*.js',
                    //'<%= paths.build %>/src/app/*.modules.js',
                    //'<%= paths.build %>/src/**/*.js',
                    //'<%= html2js.common.dest %>',
                    //'<%= html2js.app.dest %>',
                    //'<%= vendor_files.css %>',
                    //'<%= recess.build.dest %>'
                ]
            },
        }

    };

    var userConfig = require('./build.config.js');
    grunt.initConfig(grunt.util._.extend(gruntConfig, userConfig));

    grunt.registerMultiTask('buildClient', 'Execute build', function () {
        grunt.log.writeln(this.target + ': ' + this.data);
        grunt.task.run(this.data);
    });

    grunt.registerTask('default', ['buildClient:dev', 'server']);
/*
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
*/
    var find = require('find'),
        path = require('path');

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/) || (file.match(/\.modules/));
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }

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

            if (buildType === 'dev') {
                files[cssFile] = lessFile;
            } else {
                files[grunt.config.data.paths.build + '/' + cssFile] = lessFile;
            }
        }
        grunt.config.set('less', {build: {options: options, files: files}});
        grunt.task.run('less');
    });

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config.data.paths.build + '|' + grunt.config.data.paths.compile + ')\/', 'g');

        var jsFiles = filterForJS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('app/index.html', this.data.dir + '/index.html', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config.data.pkg.version
                    }
                });
            }
        });
    });

    grunt.registerTask('server', 'Start server.', function() {
        this.async();
        require(grunt.config.data.paths.root + '/' + grunt.config.data.paths.server + '/server.js');
    });
};
