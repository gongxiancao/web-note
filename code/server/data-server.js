'use strict';

var dal = require('./dal');

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
            dal(req.ctx).queryNotes(function (err, items) {
                res.json(items);
            });
        });

        app.get('/api/notes/:id', function (req, res) {
            console.log('*enter getNote*');
            dal(req.ctx).getNote(req.params.id, function (err, item) {
                res.json(item);
            });
        });

        app.post('/api/notes', function(req, res){
            console.log('*enter saveNoteNote*');
            dal(req.ctx).saveNote(req.body, function (err, item) {
                res.json(item);
            });
        });

        app.del('/api/notes/:id', function(req, res){
            console.log('*enter deleteNote*');
            dal(req.ctx).deleteNote(req.params.id, function (err, item) {
                res.json(item);
            });
        });

        done();
    }
};
