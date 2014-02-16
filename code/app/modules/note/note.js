'use strict';

angular.module('note', ['ui', 'platform', 'ngResource', 'ui.router', 'templates-app']).
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/welcome");
    $stateProvider.
        state('notes', {
            url: '/notes',
            templateUrl: 'modules/note/templates/note-management.tpl.html',
            controller: 'NoteManagementCtrl'
        })
        .state('note', {
            url: '/notes/:id',
            templateUrl: 'modules/note/templates/note-detail.tpl.html',
            controller: 'NoteDetailCtrl'
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'modules/note/templates/welcome.tpl.html'
        });
}]);
