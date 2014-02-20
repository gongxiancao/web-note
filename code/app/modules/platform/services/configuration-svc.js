'use strict';

angular.module('platform').service('ConfigurationService', [
    function () {
        var configuration = {

        };
        this.get = function () {
            return configuration;
        };
    }
]);