'use strict';

angular.module('note').directive('noteToolbar', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-toolbar-tmpl.tpl.html',
        controller: 'NoteToolbarCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (/*scope, element, attr, controller*/) {
        }
    };
}]);
