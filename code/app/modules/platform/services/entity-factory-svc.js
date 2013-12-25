'use strict';

angular.module('platform').service('EntityFactoryService', [function () {
    var registrationTable = {};
    var constructors = {};

    this.registerEntity = function (type, constructor) {
        registrationTable[type] = constructor;
    };

    this.registerEntityServices = function (type, factor) {
        
    };

    this.createEntity = function (obj) {
        var constructor = registrationTable[obj.type];
        if(constructor) {
            return new constructor(obj);
        }
    };
}]);
