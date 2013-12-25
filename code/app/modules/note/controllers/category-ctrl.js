'use strict';

angular.module('note').controller('NoteListCtrl', ['$scope', 'LoggerService', 'NoteUiService', 'CategoryService',
    function ($scope, LoggerService, NoteUiService, CategoryService) {
        var modelWatch = null;
        function refresh () {
            CategoryService.query().then(function (data) {
                $scope.catgories = data;
                //$scope.noteTree = {label:'all', children: [{label:'book', children: [{label:'7 Habits'}]}, {label:'memo', children: [{label:'angular'}]}]};
            });
        }

        refresh();
    }
]);
