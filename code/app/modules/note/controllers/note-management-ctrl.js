'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', 'NoteTreeEntity', 'NoteUiService',
    function ($scope, NoteTreeEntity, NoteUiService) {
        $scope.options = {
            data: 'noteTree',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
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
