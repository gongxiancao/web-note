'use strict';
var match = require('matchdep');

module.exports = function (grunt) {
    // load all grunt tasks
    match.filter('grunt-*', require('./package.json')).forEach(grunt.loadNpmTasks);

    // configurable paths
    var gruntConfig = {
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
                        dest: '<%= paths.build %>/assets',
                        cwd: '<%= paths.app %>/assets',
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
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= paths.build %>/',
                        cwd: '<%= paths.app %>/',
                        expand: true
                    }
                ]
            },
            build_vendor_js: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= paths.build %>/vendor',
                        cwd: '<%= paths.vendor %>',
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
                files: [
                    {
                        src:'<%= vendor_files.js %>',
                        cwd:'<%= paths.vendor %>',
                        expand: true
                    },
                    {
                        src: [
                            '<%= app_files.js %>',
                            '<%= app_files.css %>'
                        ],
                        cwd:'<%= paths.app %>'
                    }
                ]
            },
        },
        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:jshint:gruntfile' ],
                options: {
                    livereload: false
                }
            },

            jssrc: {
                files: [
                    '<%= app_files.js %>',
                ],
                cwd: '<%= paths.app %>',
                tasks: [ 'jshint:jshint:src', 'karma:unit:run', 'copy:build_appjs' ]
            },

            assets: {
                files: [
                    '<%= app_files.assets%>'
                ],
                cwd: '<%= paths.app %>',
                tasks: [ 'copy:build_assets' ]
            },

            // html: {
            //     files: [ '<%= app_files.html %>' ],
            //     tasks: [ 'index:build' ]
            // },

            // tpls: {
            //     files: [
            //         '<%= app_files.atpl %>',
            //         '<%= app_files.ctpl %>'
            //     ],
            //     tasks: [ 'html2js' ]
            // },

            // less: {
            //     files: [ 'app/**/*.less' ],
            //      tasks: [ 'less2css' ]
            // }

        }
    };

    var userConfig = require('./build.config.js');
    grunt.initConfig(grunt.util._.extend(gruntConfig, userConfig));

    grunt.registerMultiTask('buildClient', 'Execute build', function () {
        grunt.log.writeln(this.target + ': ' + this.data);
        grunt.task.run(this.data);
    });

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', [ 'buildClient:dev', 'delta', 'server', /*'karma:unit',*/   ]);

    grunt.registerTask('default', ['watch']);
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

        lessFiles.push(path.normalize(grunt.config.data.paths.app + '/assets/css/third-party.less'));
        lessFiles.push(path.normalize(grunt.config.data.paths.app + '/app/assets/css/note.less'));
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

    grunt.registerTask('server', 'Start a custom web server.', function() {
        require(grunt.config.data.paths.root + '/' + grunt.config.data.paths.server + '/server.js');
    });

    grunt.registerTask('server-async', 'Start server async.', function() {
        var done = this.async(),
            server = require(grunt.config.data.paths.root + '/' + grunt.config.data.paths.server + '/server.js');
        server.on('close', done);
    });
};
