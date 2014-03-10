'use strict';

angular.module('note').directive('noteSelect', ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-select.tpl.html',
        scope: true,
        controller: ['$scope', 'NoteTreeEntity', 'NoteUiService', function ($scope, NoteTreeEntity, NoteUiService) {
            $scope.options = {};
            var loadNoteTrees = this.loadNoteTrees = function () {
                NoteTreeEntity.query(function (trees) {
                    $scope.options.data = trees;
                });
            };

            loadNoteTrees();

            $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
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

            scope.$parent.$watch(modelGet, function (id){
                if(id && scope.options.data) {
                    scope.path = buildPath(scope.options.data, id);
                }
            });

            scope.$watch('options.data', function (data){
                var id = modelGet(scope.$parent);
                if(data && id) {
                    scope.path = buildPath(scope.options.data, id);
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

