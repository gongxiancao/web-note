'use strict';

angular.module('note', ['ui', 'platform', 'ngResource', 'ui.router']).
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/welcome");
    $stateProvider.
        state('notes', {
            url: '/notes',
            templateUrl: 'modules/note/views/note-management.html',
            controller: 'NoteManagementCtrl'
        })
        .state('note', {
            url: '/notes/:id',
            templateUrl: 'modules/note/views/note-detail.html',
            controller: 'NoteDetailCtrl'
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'modules/note/views/welcome.html'
        });
}]);
