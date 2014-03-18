'use strict';

angular.module('note').controller('NoteDetailCtrl', ['$scope', '$stateParams', 'NoteEntity', 'NoteUtilityService',
    function ($scope, $stateParams, NoteEntity, NoteUtilityService) {
        $scope.pathOptions = {
            data: 'notePath',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
        };
        $scope.id = $stateParams.id;
        NoteEntity.get({id: $scope.id}, function (result) {
            $scope.model = result;
            var template = $scope.model.template || 'note';
            $scope.templateUrl = 'modules/note/templates/note-templates/' + template  + '.tpl.html';
        });

        $scope.$watch('noteTree', function (data, old) {
            if(data) {
                $scope.notePath = NoteUtilityService.buildPath($scope.id, data);
            }
        });
    }
]);
