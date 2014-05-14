'use strict';

angular.module('ui').directive('ntRedactor', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        scope: true,
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var redactor,
                getVal = function () {
                    if(redactor) {
                        return redactor.getCode();
                    }
                },
                apply = function () {
                    ngModel.$pristine = false;
                    scope.$apply();
                },
                options = {
                    execCommandCallback: apply,
                    keydownCallback: apply,
                    keyupCallback: apply
                };

            $timeout(function () {
                redactor = element.redactor(options);
                ngModel.$render();
            });
            ngModel.$render = function () {
                if(redactor) {
                    redactor.setCode(ngModel.$viewValue || '');
                }
            };
            scope.$watch(getVal, function (newVal) {
                if(!ngModel.$pristine) {
                    ngModel.$setViewValue(newVal);
                }
            });
        }
    };
}]);
