angular.module('note').directive('noteToolbar', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/views/note-toolbar-tmpl.html',
        controller: 'NoteToolbarCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (scope, element, attr, controller) {
        }
    };
}]);
