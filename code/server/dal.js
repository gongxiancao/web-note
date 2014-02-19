module.exports = function (ctx) {
    function createConStr(ctx) {

        // default product: 'postgres://postgres:note@localhost/postgres'
        var tenant = 'public_user',
            pwd = 'note',
            host = 'localhost',
            port = '5432',
            db = 'postgres';

        ctx.constr = "postgres://"+tenant+":"+pwd+"@"+host+":"+port+"/"+db;
        return ctx.constr;
    }

    createConStr(ctx);

    var db = require('pg'),
        _ = require('underscore'),
        mockNoteTable = require('./mock-data/note.json'),
        $this = {
            getNote: function (id, done) {
                var item = _.find(mockNoteTable, function (item) {
                    return item.created_by === ctx.user && item.id === id;
                });
                done(null, item);
            },
            queryNotes: function (done) {
                var items = _.select(mockNoteTable, function (item) {
                    return item.created_by === ctx.user;
                });
                done(null, items);
            },
            createNote: function (note, done) {
                mockNoteTable.push(note);
                note.id = mockNoteTable.length;
                done(null, note);
            },
            updateNote: function (note, done) {
                getNote(ctx.user, note.id, function (err, item) {
                    if(item) {
                        item.subject = note.subject.
                        item.content = note.content;
                    }
                    done(null, item);
                });
            },
            saveNote: function (note, done) {
                if(note.id) {
                    return this.updateNote(note, done);
                }
                return this.createNote(note, done);
            },
            deleteNote: function (id, done) {
                var index = -1;
                _.find(function (item, i) {
                    if(item.id === id) {
                        index = i;
                    }
                    return item.id === id;
                });
                if(index >= 0) {
                    mockNoteTable.splice(index, 1);
                }
                done();
            }
        };

   return $this;
}