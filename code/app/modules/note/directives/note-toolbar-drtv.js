'use strict';

angular.module('note').directive('noteToolbar', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-toolbar.tpl.html',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (scope/*, element, attr, controller*/) {
            scope.visible = function (item) {
                return angular.isFunction(item.visible)? item.visible() : (angular.isDefined(item.visible)? item.visible : true);
            };
        }
    };
}]);
