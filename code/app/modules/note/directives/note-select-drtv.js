'use strict';

angular.module('note').directive('noteSelect', ['$parse', 'NoteUtilityService', function ($parse, NoteUtilityService) {
    return {
        restrict: 'EA',
        templateUrl: 'modules/note/templates/note-select.tpl.html',
        scope: true,
        controller: ['$scope', 'NoteTreeEntity', 'NoteUiService', function ($scope, NoteTreeEntity, NoteUiService) {
            $scope.treeOptions = {
                data: 'tree',
                selectedItems: [],
                nodeClick: function () {
                    $scope.open = false;
                }
            };

            $scope.pathOptions = {
                data: 'path',
                nodeTemplate: '<span>{{node[options.label]}}</span>'
            };

            var loadNoteTrees = this.loadNoteTrees = function () {
                NoteTreeEntity.query(function (nodes) {
                    $scope.tree = nodes;
                });
            };

            loadNoteTrees();

            $scope.$on(NoteUiService.newNoteAdded, loadNoteTrees);
        }],
        link: function (scope, element, attr/*, controller*/) {
            var modelGet = $parse(attr.ngModel),
                modelSet = modelGet.assign;

            scope.$parent.$watch(modelGet, function (id){
                if(id && scope.tree) {
                    scope.path = NoteUtilityService.buildPath(id, scope.tree);
                }
            });

            scope.$watch('tree', function (data){
                var id = modelGet(scope.$parent);
                if(data && id) {
                    scope.path = NoteUtilityService.buildPath(id, scope.tree);
                }
            });

            scope.$watch('treeOptions.selectedItems', function (items) {
                if(items && items.length) {
                    modelSet(scope.$parent, items[0].id);
                }
            }, true);
        }
    };
}]);

