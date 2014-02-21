'use strict';

angular.module('ui').directive('tree', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/ui/templates/tree-drtv.tpl.html',
        controller: 'TreeCtrl',
        link: function (scope, element, attr/*, controller*/) {
            scope.label = attr.label || 'label';
            scope.children = attr.children || 'children';
            scope.node = {};
            scope.$watch(attr.data, function (newValue) {
                scope.node[scope.children] = newValue;
            });
        }
    };
}]);
