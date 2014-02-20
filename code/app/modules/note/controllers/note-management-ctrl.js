'use strict';

angular.module('note').controller('NoteManagementCtrl', ['$scope',
    function ($scope) {
        $scope.noteTrees = [
            {
                label: 'note 1',
                nodes: [
                    {
                        label: 'note 1.1',
                        nodes: [
                            {
                                label: 'note 1.1.1'
                            }
                        ]
                    },
                    {
                        label: 'note 1.2',
                        nodes: [
                            {
                                label: 'note 1.2.1'
                            }
                        ]
                    },
                ]
            },
            {
                label: 'note 2'
            }
        ];
    }
]);
