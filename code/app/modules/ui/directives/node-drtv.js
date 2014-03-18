'use strict';
/*
    $scope.noteTreeOptions = {
        label: 'subject',
        children: 'children',
        selectedItems: [],
        multiSelect: false,
        nodeTemplate: '<a ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}" href>{{node[options.label]}}</a>'
        nodeClick: function (node) {
            console.log(node);
        }
    };
*/


angular.module('ui').directive('node', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: false,
        compile: function () {
            return {
                pre: function ($scope, iElement) {
                    if (iElement.children().length === 0) {
                        iElement.append($compile($scope.options.nodeTemplate)($scope));
                    }
                }
            };
        }
    };
}]);
