'use strict';

angular.module('note').controller('NoteDetailCtrl', ['$scope', '$stateParams', 'NoteEntity',
    function ($scope, $stateParams, NoteEntity) {
        NoteEntity.get({id: $stateParams.id}, function (result) {
            $scope.model = result;
        });
    }
]);
