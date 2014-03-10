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

angular.module('ui').directive('noteTree', ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        template: '<div tree options="options"/>',
        scope: true,
        link: function (scope, element, attr) {
            var optionsGet = $parse(attr.options);
            var options = optionsGet(scope.$parent);

            options = options || {};

            scope.options = angular.extend(options, {
                label: 'subject',
                children: 'children',
                selectedItems: [],
                multiSelect: false,
                nodeClick: function (node) {
                    console.log(node);
                }
            });
        }
    };
}]);
