angular.module('platform').service('LoggerService', ['$rootScope', '$q', 'ConfigurationService',
    function ($rootScope, $q, ConfigurationService) {
        this.info = console.info.bind(console);
        this.error = console.error.bind(console);
        this.warn = console.warn.bind(console);
        this.log = console.log.bind(console);
    }
]);