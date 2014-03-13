'use strict';

angular.module('note').controller('AddNoteCtrl', ['$scope',
    function ($scope) {
        $scope.isCategory = ($scope.model.template === 'category');
        $scope.$watch('isCategory', function (value){
            if(angular.isDefined(value)) {
                $scope.model.template = value ? 'category' : 'note';
            }
        });
    }
]);
