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

        loadNoteTrees();

        $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
    }
]);
