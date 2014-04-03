'use strict';

angular.module('note').directive('noteSearch', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-search.tpl.html',
        controller: 'NoteSearchCtrl',
        scope: {
            options: '='
        },
        link: function (scope/*, element, attr, controller*/) {
            scope.search = function () {
                scope.options.actionHandler(scope.query);
            };
        }
    };
}]);
