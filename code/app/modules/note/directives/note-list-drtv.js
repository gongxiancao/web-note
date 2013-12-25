angular.module('note').directive('noteList', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/views/note-list-tmpl.html',
        controller: 'NoteListCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (scope, element, attr, controller) {
        }
    };
}]);
