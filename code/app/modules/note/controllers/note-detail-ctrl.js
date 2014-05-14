'use strict';

angular.module('note').controller('NoteDetailCtrl', ['$scope', '$stateParams', 'NoteEntity', 'NoteUtilityService', 'NoteUiService',
    function ($scope, $stateParams, NoteEntity, NoteUtilityService, NoteUiService) {
        $scope.pathOptions = {
            data: 'notePath',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
        };

        $scope.id = $stateParams.id;
        NoteEntity.get({id: $scope.id}, function (result) {
            $scope.model = result;
            var template = $scope.model.template || 'note';
            $scope.templateUrl = 'modules/note/templates/note-templates/' + template  + '.tpl.html';
        });

        NoteEntity.query(NoteUtilityService.flattenObject({filter: {parent: $scope.id}, search: $stateParams.search}), function (result) {
            $scope.children = result;
        });

        $scope.$watch('noteTree', function (data, old) {
            if(data) {
                $scope.notePath = NoteUtilityService.buildPath($scope.id, data);
            }
        });

        $scope.toolbarOptions = {
            buttons: [
                {
                    name: 'edit',
                    localized_label: 'Edit',
                    actionHandler: function () {
                        $scope.inEditMode = true;
                    },
                    visible: function () {
                        return !$scope.inEditMode;
                    }
                },
                {
                    name: 'save',
                    localized_label: 'Save',
                    hide: true,
                    actionHandler: function () {
                        NoteEntity.save($scope.model, function (result) {
                            console.log('save successful');
                        });
                        $scope.inEditMode = false;
                    },
                    visible: function () {
                        return $scope.inEditMode;
                    }
                },
                {
                    name: 'cancel',
                    localized_label: 'Cancel',
                    hide: true,
                    actionHandler: function () {
                        $scope.inEditMode = false;
                    },
                    visible: function () {
                        return $scope.inEditMode;
                    }
                }
            ]
        };
    }
]);
