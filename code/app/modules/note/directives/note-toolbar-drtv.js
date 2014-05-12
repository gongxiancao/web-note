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
                return !item.hide;
            };
        }
    };
}]);
