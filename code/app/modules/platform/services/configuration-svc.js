angular.module('platform').service('ConfigurationService', ['$rootScope', '$q',
    function ($rootScope, $q) {
        var configuration = {

        };
        this.get = function () {
            return configuration;
        };
    }
]);