angular.module('note').directive('noteSearch', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/views/note-search-tmpl.html',
        controller: 'NoteSearchCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (scope, element, attr, controller) {
        }
    };
}]);
