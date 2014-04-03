'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', '$state', 'NoteTreeEntity', 'NoteUiService',
    function ($scope, $state, NoteTreeEntity, NoteUiService) {
        $scope.options = {
            data: 'noteTree',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
        };

        $scope.searchOptions = {
            actionHandler: function (search) {
                $state.go('notes.detail', {search: search});
            }
        };

        function loadNoteTrees() {
            NoteTreeEntity.query(function (trees) {
                $scope.noteTree = trees;
            });
        }

        $scope.toolbarOptions = {
            buttons: [
                {
                    name: 'add',
                    localized_label: 'Add note',
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
                }
            ]
        };

        loadNoteTrees();

        $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
    }
]);
