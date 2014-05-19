'use strict';

angular.module('note').controller('NoteDetailCtrl', ['$scope', '$stateParams', 'NoteEntity', 'NoteTreeEntity', 'NoteUtilityService', 'NoteUiService',
    function ($scope, $stateParams, NoteEntity, NoteTreeEntity, NoteUtilityService, NoteUiService) {
        $scope.pathOptions = {
            data: 'notePath',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
        };

        $scope.id = $stateParams.id;

        function loadNoteTrees() {
            NoteTreeEntity.query(function (trees) {
                $scope.noteTree = trees;
            });
        }

        loadNoteTrees();

        $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
        $scope.$on(NoteUiService.noteChanged, loadNoteTrees);

        function loadNote () {
            NoteEntity.get({id: $scope.id}, function (result) {
                $scope.model = result;
                var template = $scope.model.template || 'note';
                $scope.templateUrl = 'modules/note/templates/note-templates/' + template  + '.tpl.html';
            });
        }

        loadNote();

        function loadChildren () {
            NoteEntity.query(NoteUtilityService.flattenObject({filter: {parent: $scope.id}, search: $stateParams.search}), function (result) {
                $scope.children = result;
            });
        }

        loadChildren();

        $scope.$watch('noteTree', function (data, old) {
            if(data) {
                $scope.notePath = NoteUtilityService.buildPath($scope.id, data, false);
            }
        });

        $scope.toolbarOptions = {
            buttons: [
                {
                    name: 'add',
                    localized_label: 'Add note',
                    class: 'btn-default',
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
                    name: 'edit',
                    localized_label: 'Edit',
                    class: 'btn-default',
                    actionHandler: function () {
                        $scope.inEditMode = true;
                        $scope.model.newContent = $scope.model.content;
                    },
                    visible: function () {
                        return !$scope.inEditMode;
                    }
                },
                {
                    name: 'save',
                    localized_label: 'Save',
                    class: 'btn-primary',
                    hide: true,
                    actionHandler: function () {
                        $scope.model.content = $scope.model.newContent;
                        delete $scope.model.newContent;
                        NoteUiService.save($scope.model).then(function () {
                            $scope.inEditMode = false;
                        });
                    },
                    visible: function () {
                        return $scope.inEditMode;
                    }
                },
                {
                    name: 'cancel',
                    localized_label: 'Cancel',
                    class: 'btn-warning',
                    hide: true,
                    actionHandler: function () {
                        delete $scope.model.newContent;
                        $scope.inEditMode = false;
                    },
                    visible: function () {
                        return $scope.inEditMode;
                    }
                }
            ]
        };
    }
]);
