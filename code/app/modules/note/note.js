'use strict';

angular.module('note', ['ui', 'platform', 'ngResource', 'ui.router', 'templates-app']).
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes');
    $stateProvider.
        state('notes', {
            url: '/notes',
            templateUrl: 'modules/note/templates/note-management.tpl.html',
            controller: 'NoteManagementCtrl'
        })
        .state('notes.detail', {
            url: '/{id:[0-9]+}?search',
            templateUrl: 'modules/note/templates/note-detail.tpl.html',
            controller: 'NoteDetailCtrl'
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'modules/note/templates/welcome.tpl.html'
        });
}]);
