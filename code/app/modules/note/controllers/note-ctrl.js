'use strict';

angular.module('note').controller('NoteCtrl', ['$scope', 'LoggerService', 'NoteUiService', 'NoteService', 'EntityService',
    function ($scope, LoggerService, NoteUiService, NoteService, EntityService) {
        LoggerService.info('new note saved:');
        $scope.addNewNote = function () {
            NoteUiService.openAddNewNote(new NoteService.Note())
            .then(EntityService.save)
            .then(function (note) {
                LoggerService.info('New note added: ' + JSON.stringify(note));
            });
        };
    }
]);
