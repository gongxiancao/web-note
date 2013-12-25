'use strict';

angular.module('platform').service('UtilityService', [
    function () {
        this.inherit = function (Parent, Child) {
            var F = function() {};
            F.prototype = Parent.prototype;
            F.constructor = Child;
            Child.prototype = new F();
            Child.uber = Parent.prototype;
        };

        this.$false = function () { return false; };

        this.$true = function () { return true; };

        this.noop = function () {};
    }
]);