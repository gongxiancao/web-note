'use strict';

var dal = require('./dal'),
    _ = require('underscore');

module.exports = function (ctx) {

    var $this = {
            getNote: function (id, done) {
                dal(ctx).getNote(id, done);
            },
            queryNotes: function (filter, done) {
                dal(ctx).queryNotes(filter, done);
            },
            getNoteTrees: function (done) {
                dal(ctx).queryNotes(function (err, items) {
                    if(err) {
                        return done(err);
                    }
                    var map = {},
                        trees = [],
                        parent;
                    _.forEach(items, function (item) {
                        map[item.id] = item;
                        delete item.children;
                    });
                    _.forEach(items, function (item) {
                        if(item.parent) {
                            parent = map[item.parent];
                            parent.children = parent.children || [];
                            parent.children.push(item);
                        } else {
                            trees.push(item);
                        }
                    });
                    done(null, trees);
                });
            },
            createNote: function (note, done) {
                dal(ctx).createNote(note, done);
            },
            updateNote: function (note, done) {
                dal(ctx).updateNote(note, done);
            },
            saveNote: function (note, done) {
                dal(ctx).saveNote(note, done);
            },
            deleteNote: function (id, done) {
                dal(ctx).deleteNote(id, done);
            }
        };

    return $this;
};