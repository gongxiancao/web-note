'use strict';

angular.module('ui').directive('tree', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/ui/templates/tree-drtv.tpl.html',
        controller: 'TreeCtrl',
        link: function (scope, element, attr/*, controller*/) {
            scope.node = {
                nodes: scope[attr.data]
            };
        }
    };
}]);
