'use strict';

angular.module('ui').controller('DialogCtrl', ['$scope', 'dialog', 'title', 'contentUrl', 'model', 'buttonInfos',
    function ($scope, dialog, title, contentUrl, model, buttonInfos) {
        $scope.title = title;
        $scope.contentUrl = contentUrl;
        $scope.model = model;
        $scope.buttonInfos = buttonInfos;

        $scope.invokeHandler = function (handler) {
            handler.call(dialog, model);
        };
    }
]);
