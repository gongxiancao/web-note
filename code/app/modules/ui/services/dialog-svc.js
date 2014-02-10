'use strict';

angular.module('ui').service('DialogService', ['$rootScope', '$modal',
    function ($rootScope, $modal) {
        this.open = function (opts, scope) {
            opts = opts || {};
            opts.controller = opts.controller || 'DialogCtrl';

            opts.scope = scope || opts.scope || $rootScope.$new();
            opts.scope.title = opts.title;
            opts.scope.contentUrl = opts.contentUrl;
            opts.scope.buttonInfos = opts.buttonInfos;

            opts.backdrop = angular.isUndefined(opts.backdrop) ? true : angular.backdrop;
            opts.keyboard = angular.isUndefined(opts.keyboard) ? true : angular.keyboard;
            opts.backdropClick = angular.isUndefined(opts.backdropClick) ? true : angular.backdropClick;

            if(!(opts.template || opts.templateUrl)){
                opts.templateUrl = 'modules/ui/templates/dialog.tpl.html';
            }
            return $modal.open(opts).result;
        }
    }
]);