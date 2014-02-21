'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', 'NoteTreeEntity', 'NoteUiService',
    function ($scope, NoteTreeEntity, NoteUiService) {

        $scope.noteTreeOptions = {
            label: 'subject',
            children: 'children',
            selectedItems: [],
            multiSelect: false,
            nodeClick: function (node) {
                console.log(node);
            }
        };

        function loadNoteTrees() {
            NoteTreeEntity.query(function (trees) {
                $scope.noteTreeOptions.data = trees;
            });
        }

        loadNoteTrees();

        $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);

    }
]);
