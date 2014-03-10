'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', 'NoteTreeEntity', 'NoteUiService',
    function ($scope, NoteTreeEntity, NoteUiService) {
        $scope.options = {};

        function loadNoteTrees() {
            NoteTreeEntity.query(function (trees) {
                $scope.options.data = trees;
            });
        }

        loadNoteTrees();

        $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
    }
]);
