'use strict';

angular.module('note').service('NoteUtilityService', 
    function () {
        var buildMap = this.buildMap = function (map, nodes) {
            nodes.forEach(function (node) {
                map[node.id] = node;
                buildMap(map, node.children || []);
            });
            return map;
        };

        var buildPath = this.buildPath = function (id, nodes) {
            var map = buildMap({}, nodes),
                node = map[id],
                path = [node];
            while(node.parent) {
                node = map[node.parent];
                path.push(node);
            }
            return path.reverse();
        };
    }
);