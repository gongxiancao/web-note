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
            var optionsGet = $parse(attr.options),
                options = optionsGet(scope.$parent),
                defaults = {
                    label: 'subject',
                    children: 'children',
                    selectedItems: [],
                    multiSelect: false,
                    nodeClick: function (node) {
                        console.log(node);
                    }
                };

            options = angular.extend(defaults, options);

            scope.options = options;

            if(options.data === 'string') {
                scope.$parent.$watch(options.data, function (data) {
                    scope[options.data] = data;
                });
            }
        }
    };
}]);
