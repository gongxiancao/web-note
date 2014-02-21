'use strict';

var notes = require('./notes');

module.exports = {
    initialize: function (options, done) {
        done();
    },
    config: function (app, options, done) {
        function TenantHandler (req, res, next) {
            req.ctx = {};
            req.ctx.tenant = req.query.tenant;
            req.ctx.user = 1;
            next();
        }
        app.use(TenantHandler);

        app.get('/api/notes', function(req, res){
            console.log('*enter queryNotes*');
            notes(req.ctx).queryNotes(function (err, items) {
                res.json(items);
            });
        });

        app.get('/api/note-trees', function(req, res){
            console.log('*enter getNoteTrees*');
            notes(req.ctx).getNoteTrees(function (err, items) {
                res.json(items);
            });
        });

        app.get('/api/notes/:id', function (req, res) {
            console.log('*enter getNote*');
            notes(req.ctx).getNote(req.params.id, function (err, item) {
                res.json(item);
            });
        });

        app.post('/api/notes', function(req, res){
            console.log('*enter saveNoteNote*');
            notes(req.ctx).saveNote(req.body, function (err, item) {
                res.json(item);
            });
        });

        app.del('/api/notes/:id', function(req, res){
            console.log('*enter deleteNote*');
            notes(req.ctx).deleteNote(req.params.id, function (err, item) {
                res.json(item);
            });
        });

        done();
    }
};
