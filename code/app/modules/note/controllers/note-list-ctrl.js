'use strict';

angular.module('note').controller('NoteListCtrl', ['$scope', 'LoggerService', 'NoteUiService', 'NoteService', 'EntityService',
    function ($scope, LoggerService, NoteUiService, NoteService, EntityService) {
        NoteService.query().then(function (data) {
            $scope.notes = data;
        });

        $scope.$on(NoteUiService.newNoteAdded, function (e, note) {
            $scope.notes.push(note);
        });
    }
]);
