'use strict';

angular.module('note').directive('noteList', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-list.tpl.html',
        controller: 'NoteListCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (/*scope, element, attr, controller*/) {
        }
    };
}]);
