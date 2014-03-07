'use strict';
/*
    $scope.noteTreeOptions = {
        label: 'subject',
        children: 'children',
        selectedItems: [],
        multiSelect: false,
        nodeClick: function (node) {
            console.log(node);
        }
    };
*/

angular.module('ui').directive('noteTree', [function () {
    return {
        restrict: 'EA',
        template: '<div tree options="noteTreeOptions"/>',
        controller: ['$scope', 'NoteTreeEntity', 'NoteUiService', function ($scope, NoteTreeEntity, NoteUiService) {
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

        }]
    };
}]);
