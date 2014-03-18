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


angular.module('ui').directive('path', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/ui/templates/path-drtv.tpl.html',
        scope: {
            options: '='
        },
        link: function (scope/*, element, attr, controller*/) {
            var options = scope.options,
                defaults = {
                    nodeTemplate: '<a ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}" href>{{node[options.label]}}</a>',
                    filter: function (item) {
                        return true;
                    }
                };

            scope.options = options = angular.extend(defaults, options);
            //scope.filter = options.filter;

            if(angular.isString(options.data)) {
                scope.$parent.$watch(options.data, function (data) {
                    scope.path = data;
                });
            } else {
                scope.path = options.data;
            }

            scope.nodeClick = function (node) {
                if(angular.isFunction(scope.options.nodeClick)) {
                    scope.options.nodeClick(node);
                }
            };
        }
    };
}]);
