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

angular.module('ui').directive('tree', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/ui/templates/tree-drtv.tpl.html',
        scope: {
            options: '='
        },
        link: function (scope/*, element, attr, controller*/) {
            var options = scope.options,
                defaults = {
                    selectedItems: [],
                    nodeTemplate: '<a ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}" href>{{node[options.label]}}</a>',
                    filter: function (item) {
                        return true;
                    }
                };

            scope.options = options = angular.extend(defaults, options);
            //scope.filter = options.filter;

            scope.node = {};
            if(angular.isString(options.data)) {
                scope.$parent.$watch(options.data, function (newValue) {
                    scope.node[options.children] = newValue;
                });
            } else {
                scope.node[options.children] = options.data;
            }

            scope.nodeClick = function (node) {
                var selectedItems = options.selectedItems,
                    index;

                if(options.multiSelect) {
                    index = options.selectedItems.indexOf(node);
                    if(index >= 0) {
                        selectedItems.splice(index, 1);
                    } else {
                        selectedItems.push(node);
                    }
                } else {
                    selectedItems.length = 1;
                    selectedItems[0] = node;
                }

                scope.options.nodeClick(node);
            };

            scope.nodeSelected = function (node) {
                return options.selectedItems.indexOf(node) >= 0;
            };
        }
    };
}]);

angular.module('ui').directive('treeNode', ['$compile', function ($compile) {
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
