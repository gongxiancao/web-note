'use strict';

angular.module('note').controller('NoteListCtrl', ['$scope', 'LoggerService', 'NoteUiService', 'NoteEntity',
    function ($scope, LoggerService, NoteUiService, NoteEntity) {
        NoteEntity.query().$promise.then(function (data) {
            $scope.notes = data;
        });

        $scope.$on(NoteUiService.newNoteAdded, function (e, note) {
            $scope.notes.push(note);
        });
    }
]);
