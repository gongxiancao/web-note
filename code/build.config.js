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
            'app/*.js',
            'app/modules/*/*.js',
            'app/modules/*/**/*.js'
        ],
        css: [
            'app/assets/css/third-party.css',
            'app/assets/css/ui.css',
            'app/assets/css/note.css'
        ],
        assets: [
        ],
        atpl: [ 'app/**/*.tpl.html' ]
    },
    vendor_files: {
        js: [
            'vendor/jquery/jquery.js',
            'vendor/lodash/dist/lodash.js',
            'vendor/angular/angular.js',
            'vendor/jquery-ui/ui/jquery-ui.js',
            'vendor/angular-animate/angular-animate.js',
            'vendor/angular-ui-utils/modules/route/route.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/ng-grid/ng-grid-2.0.7.debug.js',
            'vendor/log4javascript/log4javascript.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'vendor/d3/d3.js',
            'vendor/nvd3/nv.d3.js',
            'vendor/angular-translate/angular-translate.js',
            'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'vendor/redactor/redactor/redactor.js'
        ],
        css: [
            'vendor/bootstrap/dist/css/bootstrap.css',
            'vendor/bootstrap/dist/css/bootstrap.css.map',
            'vendor/select2/select2.css',
            'vendor/redactor/redactor/redactor.css'
        ],
        assets: [
            'vendor/tinymce/**/*.gif'
        ]
    }
};
