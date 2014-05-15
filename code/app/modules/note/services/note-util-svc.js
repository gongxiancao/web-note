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

        var buildPath = this.buildPath = function (id, nodes, addSelf) {
            var map = buildMap({}, nodes),
                node = map[id],
                path = addSelf? [node] : [];
            while(node && node.parent) {
                node = map[node.parent];
                path.push(node);
            }
            return path.reverse();
        };

        var flattenObject = function (properties, path, obj) {
            var key, val, type;
            for(key in obj) {
                val = obj[key];
                type = typeof val;
                if(type === 'object') {
                    flattenObject(properties, path + key + '.', val);
                } else if(type !== 'function') {
                    properties[path + key] = val;
                }
            }
            return properties;
        };

        this.flattenObject = function (obj) {
            var flat = {};
            return flattenObject(flat, '', obj);
        };
    }
);