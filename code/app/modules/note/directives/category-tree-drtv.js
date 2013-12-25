angular.module('note').directive('categoryTree', [function () {
    return {
        restrict: 'EA',
        //controller: 'CategoryTreeCtrl',
        scope: {
            actionHandler: '&',
            options: '='
        },
        link: function (scope, element, attr, controller) {
            scope.$watch('categoryTree', function (model) {
                if (model) {
                    applyModel(element, model);
                }
            });

            function applyModel (element, model) {
                var html = buildTreeTag(model);
                element.html(html);
            }

            function buildTreeTag (model) {
                var tags = [];
                angular.forEach(model.children, function (val) {
                    tags.push('<li>' + buildTreeTag(val) + '</li>')
                });

                return '<div><span>' + model.label + '</span>' + 
                    (tags.length > 0 ? ('<ul>' + tags.join('') + '</ul>') : '') + '</div>';
            }
        }
    };
}]);
