'use strict';

angular.module('note').directive('noteSelect', ['$parse', 'NoteTreeEntity', function ($parse, NoteTreeEntity) {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-select.tpl.html',
        scope: true,
        controller: ['$scope', function ($scope) {
            $scope.options = {};
        }],
        link: function (scope, element, attr/*, controller*/) {
            var modelGet = $parse(attr.ngModel),
                modelSet = modelGet.assign;

            function buildMap (map, nodes) {
                nodes.forEach(function (node) {
                    map[node.id] = node;
                    buildMap(map, node.children || []);
                });
                return map;
            }

            function buildPath (nodes, id) {
                var map = buildMap({}, nodes),
                    node = map[id],
                    path = [node];
                while(node.parent) {
                    node = map[node.parent];
                    path.push(node);
                }
                return path.reverse();
            }


            scope.$watch(modelGet, function (id){
                if(id) {
                    NoteTreeEntity.query().$promise
                        .then(function(result) {
                            scope.path = buildPath(result, id);
                        });
                }
            });

            scope.$watch('options.selectedItems', function (items) {
                if(items && items.length) {
                    modelSet(scope.$parent, items[0].id);
                }
            }, true);
        }
    };
}]);
