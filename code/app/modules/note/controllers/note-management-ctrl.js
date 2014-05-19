'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope', '$state', 'NoteTreeEntity', 'NoteUiService',
    function ($scope, $state, NoteTreeEntity, NoteUiService) {
        $scope.options = {
            data: 'noteTree',
            nodeTemplate: '<a ui-sref="notes.detail({id:node.id})" ng-click="nodeClick(node)" ng-class="{selected: nodeSelected(node)}">{{node[options.label]}}</a>'
        };

        $scope.searchOptions = {
            actionHandler: function (search) {
                $state.go('notes.detail', {search: search});
            }
        };

    }
]);
