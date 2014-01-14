'use strict';

angular.module('note').controller('NoteToolbarCtrl', ['$scope', 'CategoryService', 'NoteUiService',
    function ($scope, CategoryService, NoteUiService) {
        $scope.buttons = [
            {
                name: 'add', localized_label: 'Add note', 
                actionHandler: function () {
                    var note = {};
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
