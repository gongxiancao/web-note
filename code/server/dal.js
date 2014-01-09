module.exports = function (ctx) {
    function createConStr(ctx) {

        // default product: 'postgres://postgres:note@localhost/postgres'
        var tenantUser = null;
        if(ctx.tenant) {
            tenantUser = ctx.tenant + "_user";
        }

        var tenant = tenantUser || process.env.STORM_DB_TENANTS_USERNAME || 'public_user',
            pwd = process.env.STORM_DB_TENANTS_PASSWORD || 'note',
            host = process.env.STROM_DB_TENANTS_HOST || 'localhost',
            port = process.env.STROM_DB_TENANTS_PORT || '5432',
            db = process.env.STORM_DB_TENANTS_NAME || 'postgres';

        ctx.constr = "postgres://"+tenant+":"+pwd+"@"+host+":"+port+"/"+db;
        console.log(ctx.constr);
        return ctx.constr;
    }

    var conString = createConStr(ctx),
    db = require('pg'),
    _ = require('underscore'),
    mockNoteTable = require('./note.json'),
    $this = {
        getNote: function (id, done) {
            var item = _.find(mockNoteTable, function (item) {
                return item.created_by === ctx.user && item.id === id;
            });
            done(null, item);
        },
        queryNotes: function (done) {
            var items = _.select(mockNoteTable, function (argument) {
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