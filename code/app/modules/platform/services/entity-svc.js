'use strict';


angular.module('platform').service('EntityService', ['$rootScope', '$q', '$resource', 'ConfigurationService',
    function ($rootScope, $q, $resource, ConfigurationService) {
        var configuration = ConfigurationService.get(),
            service = this,
            resource = $resource('/data/entity/:type/:id', {type:'@type', id:'@id'}, {
                query: {method: 'GET', isArray: true}
            });

        function guardId(id){
            if(typeof id !== 'string'){
                throw Error('id is not a string');
            }
        }

        var Entity = this.Entity = function (options){
            this.data = {};
            $.extend(this.data, options);
        };

        this.get = function(id) {
            var entity = new Entity({id:id});
            var deferred = $q.defer();
            entity.get(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.delete = function(id) {
            guardId(id);

            var defferred = $q.defer();
            // TODO: add delete logic

            return defferred.promise;
        };

        this.save = function (entity) {
            return entity.save();
        };

        this.query = function (type) {
            var defferred = $q.defer();
            resource.query({type:type}, function (data) {
                defferred.resolve(data);
            });
            return defferred.promise;
        };

        Entity.prototype.save = function () {
            var defferred = $q.defer(),
                that = this;

            resource.save(this.data,
                function (data) {
                    that.data = data;
                    defferred.resolve(data);
                },
                function (err) {
                    defferred.reject(err);
                }
            );

            return defferred.promise;
        };

        Entity.prototype.delete = function () {
            guardId(this.id);

            return service.delete(this.id);
        };

        Entity.prototype.get = function () {
            guardId(this.id);

            return resource.get({type: this.type, id: this.id});
        };
}]);
