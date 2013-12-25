'use strict';

angular.module('note', ['ui', 'platform', 'ngResource']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/notes', {templateUrl: 'modules/note/views/note-management.html',   controller: 'NoteManagementCtrl'}).
        when('/notes/:id', {templateUrl: 'modules/note/views/note-detail.html', controller: 'NoteDetailCtrl'}).
        otherwise({redirectTo: '/notes'});
}]);
