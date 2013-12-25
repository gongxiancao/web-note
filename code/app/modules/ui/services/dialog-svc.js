'use strict';

angular.module('ui').service('DialogService', ['$rootScope', '$dialog',
    function ($rootScope, $dialog) {
        this.open = function (opts, model) {
            opts = opts || {};
            opts.controller = opts.controller || 'DialogCtrl';
            opts.backdrop = angular.isUndefined(opts.backdrop) ? true : angular.backdrop;
            opts.keyboard = angular.isUndefined(opts.keyboard) ? true : angular.keyboard;
            opts.backdropClick = angular.isUndefined(opts.backdropClick) ? true : angular.backdropClick;

            opts.resolve = opts.resolve || {};
            opts.resolve.title = opts.resolve.title || opts.title;
            opts.resolve.contentUrl = opts.resolve.contentUrl || opts.contentUrl;
            opts.resolve.buttonInfos = opts.resolve.buttonInfos || opts.buttonInfos;
            opts.resolve.model = opts.resolve.model || model;

            if(!(opts.template || opts.templateUrl)){
                opts.templateUrl = 'modules/ui/views/dialog-tmpl.html';
            }
            var d = $dialog.dialog(opts);
            return d.open();
        }
    }
]);