'use strict';

angular.module('note').controller('NoteDetailCtrl', ['$scope', '$stateParams', 'NoteEntity',
    function ($scope, $stateParams, NoteEntity) {
        NoteEntity.get({id: $stateParams.id}, function (result) {
            $scope.model = result;
            var template = $scope.model.template || 'note';
            $scope.templateUrl = 'modules/note/templates/note-templates/' + template  + '.tpl.html';
        });
    }
]);
