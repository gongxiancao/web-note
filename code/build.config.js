/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    app_files: {
        js: [
            'build/*.js',
            'build/modules/*/*.js',
            'build/modules/*/**/*.js'
        ]
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
            'vendor/ng-grid/ng-grid-2.0.7.debug.js',
            'vendor/log4javascript/log4javascript.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-bootstrap/ui-bootstrap.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'vendor/d3/d3.js',
            'vendor/nvd3/nv.d3.js',
            'vendor/angular-translate/angular-translate.js',
            'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'vendor/angular-ui-tinymce/src/tinymce.js'
        ],
        css: [
            'vendor/jquery-ui/themes/base/jquery-ui.css',
            'vendor/select2/select2.css',
            'app/resources/css/note.css'
        ],
        assets: []
    }
};
