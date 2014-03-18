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

angular.module('ui').directive('notePath', ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        template: '<div path options="options"/>',
        compile: function() {
            return {
                pre: function (scope, element, attr) {
                    var optionsGet = $parse(attr.options),
                        options = optionsGet(scope),
                        defaults = {
                            label: 'subject'
                        };

                    options = angular.extend(defaults, options);

                    scope.options = options;
                }
            }
        }
    };
}]);
