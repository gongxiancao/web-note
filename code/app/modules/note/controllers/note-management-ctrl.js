'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', 'NoteTreeEntity',
    function ($scope, NoteTreeEntity) {
        function init() {
            NoteTreeEntity.query(function (trees) {
                $scope.noteTrees = trees;
            });
        }
        init();
    }
]);
