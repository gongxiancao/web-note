'use strict';

angular.module('note')
    .factory('NoteEntity', ['$resource', function ($resource) {
        return $resource(
            'api/notes/:id',
            {id: '@id'},
            {
                create: {method: 'POST'},
                update: {method: 'PUT'}
            }
        );
    }])
;


