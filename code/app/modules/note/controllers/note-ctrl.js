'use strict';

angular.module('note').controller('NoteCtrl', ['$scope', 'LoggerService', 'NoteUiService', 'NoteEntity',
    function ($scope, LoggerService, NoteUiService, NoteEntity) {
        LoggerService.info('new note saved:');
        /*$scope.addNewNote = function () {
            NoteUiService.openAddNewNote(NoteService.Note())
            .then(function (note) {
                return NoteEntity.save(note).promise;
            })
            .then(function (note) {
                LoggerService.info('New note added: ' + JSON.stringify(note));
            }, function (err) {
                LoggerService.error('Failed to add new note', err);
            });
        };*/
    }
]);
