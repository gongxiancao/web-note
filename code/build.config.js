/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    paths: {
            app: 'app',
            vendor: 'vendor',
            log: 'log',
            build: 'build',
            build_log: 'build_log',
            compile: 'bin',
            server: 'server',
            root: __dirname
        },
    app_files: {
        js: [
            '*.js',
            'modules/*/*.js',
            'modules/*/**/*.js'
        ],
        css: [
            'assets/css/third-party.css',
            'assets/css/note.css'
        ],
        assets: [
        ],
        atpl: [ 'app/**/*.tpl.html' ]
    },
    vendor_files: {
        js: [
            'jquery/jquery.js',
            'lodash/dist/lodash.js',
            'angular/angular.js',
            'jquery-ui/ui/jquery-ui.js',
            'angular-animate/angular-animate.js',
            'angular-ui-utils/modules/route/route.js',
            'angular-ui-router/release/angular-ui-router.js',
            'ng-grid/ng-grid-2.0.7.debug.js',
            'log4javascript/log4javascript.js',
            'angular-resource/angular-resource.js',
            'angular-bootstrap/ui-bootstrap-tpls.js',
            'd3/d3.js',
            'nvd3/nv.d3.js',
            'angular-translate/angular-translate.js',
            'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'angular-ui-tinymce/src/tinymce.js'
        ],
        css: [
            'jquery-ui/themes/base/jquery-ui.css',
            'select2/select2.css'
        ],
        assets: []
    }
};
