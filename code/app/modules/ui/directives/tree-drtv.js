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

angular.module('ui').directive('tree', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'modules/ui/templates/tree-drtv.tpl.html',
        controller: 'TreeCtrl',
        scope: {
            options: '=options'
        },
        link: function (scope/*, element, attr, controller*/) {
            var options = scope.options;

            scope.node = {};
            scope.$watch('options.data', function (newValue) {
                scope.node[options.children] = newValue;
            });

            options.selectedItems = options.selectedItems || [];

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
