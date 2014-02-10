'use strict';

angular.module('ui').controller('DialogCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.invokeHandler = function (handler) {
            handler.call($modalInstance);
        };
    }
]);
