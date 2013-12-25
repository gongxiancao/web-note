'use strict';

angular.module('note').controller('NoteToolbarCtrl', ['$scope', 'NoteService', 'CategoryService', 'NoteUiService',
    function ($scope, NoteService, CategoryService, NoteUiService) {
        $scope.buttons = [
            {
                name: 'add', localized_label: 'Add note', 
                actionHandler: function () {
                    var note = new NoteService.Note();
                    NoteUiService.openAddNewNote(note).then(
                        function (note) {
                            console.log(note);
                        },
                        function (err) {
                            throw err;
                        }
                    );
                }
            },
            {
                name: 'add', localized_label: 'Add category', 
                actionHandler: function () {
                    var category = new CategoryService.Category();
                    NoteUiService.openAddNewCategory(category).then(
                        function (category) {
                            console.log(category);
                        },
                        function (err) {
                            throw err;
                        }
                    );
                }
            },
            {
                name: 'edit', localized_label: 'Edit',
                actionHandler: function () {
                    
                }
            }
        ];
    }
]);
