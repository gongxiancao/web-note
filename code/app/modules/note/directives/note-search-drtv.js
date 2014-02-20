'use strict';

angular.module('note').directive('noteSearch', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-search-tmpl.tpl.html',
        controller: 'NoteSearchCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (/*scope, element, attr, controller*/) {
        }
    };
}]);
