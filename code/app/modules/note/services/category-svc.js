'use strict';


angular.module('note').service('CategoryService', ['$rootScope', '$q', 'EntityService', 'UtilityService',
    function ($rootScope, $q, EntityService, UtilityService) {
        var TYPE = 'Category';
        var Category = this.Category = function (options) {
            this.data = {};
            $.extend(this.data, options);
            this.data.type = TYPE;
        }

        UtilityService.inherit(EntityService.Entity, Category);

        this.query = function () {
            return EntityService.query(TYPE);
        };
    }
]);
