'use strict';


angular.module('note').service('NoteService', ['$rootScope', '$q', 'EntityService', 'UtilityService',
    function ($rootScope, $q, EntityService, UtilityService) {
        var TYPE = 'note';
        var Note = this.Note = function (options) {
            this.data = {};
            $.extend(this.data, options);
            this.data.type = TYPE;
        }

        UtilityService.inherit(EntityService.Entity, Note);

        this.query = function (query) {
            return EntityService.query(TYPE);
        }
    }
]);
