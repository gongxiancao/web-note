'use strict';

var db = require('pg'),
    pg = require('./pg'),
    _ = require('underscore'),
    mockNoteTable = require('./mock-data/note.json'),
    getFilterClause = function (filter, params) {
        var caluses = [];
        if(params.length) {
            caluses.push('');
        }
        for(var key in filter) {
            params.push(filter[key]);
            caluses.push(key + ' = $' + params.length);
        }
        return caluses.join(' and ');
    };

module.exports = function (ctx) {
    function createConStr(ctx) {

        // default product: 'postgres://postgres:note@localhost/postgres'
        var tenant = 'public_user',
            pwd = 'password',
            host = 'localhost',
            port = '5432',
            db = 'webnote';

        ctx.constr = 'postgres://' + tenant + ':' + pwd + '@' + host + ':' + port + '/' + db;
        return ctx.constr;
    }

    createConStr(ctx);

    var $this = {
            getNote: function (id, done) {
                pg(ctx).query('select * from note where id = $1', [id], pg.selectors.first, done);
            },
            queryNotes: function (options, done) {
                var params = [ctx.user],
                    done = done || options,
                    options = (options === done ? {} : options) || {},
                    filterClause = getFilterClause(options.filter, params);

                if(options.search) {
                    params.push(options.search);
                    filterClause += ' and note_ts @@ to_tsquery($'+ params.length + ') ';
                }
                pg(ctx).query('select * from note where created_by = $1 ' + filterClause, params, done);
            },
            createNote: function (note, done) {
                note.created_by = ctx.user;
                pg(ctx).query(
                    'insert into note (subject, content, created_by, parent, template) values ($1, $2, $3, $4, $5) returning id, subject, content, created_by, parent',
                    [note.subject, note.content, note.created_by, note.parent, note.template],
                    pg.selectors.first,
                    done);
            },
            updateNote: function (note, done) {
                pg(ctx).query(
                    'update note set subject = $1, content = $2, created_by = $3, parent = $4, template = $5 where id = $6',
                    [note.subject, note.content, note.created_by, note.parent, note.template, note.id],
                    pg.selectors.first,
                    done);
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
};