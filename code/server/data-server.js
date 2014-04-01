'use strict';

var notes = require('./notes'),
    errors = require('./errors');

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

        function respondWithError (error, res) {
            console.log('error: ', error);
            res.send({
                error: error.message
            }, error.status);
        }

        function resultHandler (res) {
            return function (err, result) {
                if(err) {
                    console.log(err);
                    return respondWithError(errors.wrap(err), res);
                }
                //console.log(result);
                res.json(result);
            }
        }

        app.get('/api/notes', function(req, res){
            console.log('*enter queryNotes*');
            notes(req.ctx).queryNotes(req.query, resultHandler(res));
        });

        app.get('/api/note-trees', function(req, res){
            console.log('*enter getNoteTrees*');
            notes(req.ctx).getNoteTrees(resultHandler(res));
        });

        app.get('/api/notes/:id', function (req, res) {
            console.log('*enter getNote*');
            notes(req.ctx).getNote(parseInt(req.params.id), resultHandler(res));
        });

        app.post('/api/notes/:id', function (req, res) {
            console.log('*enter saveNote*');
            notes(req.ctx).saveNote(req.body, resultHandler(res));
        });

        app.post('/api/notes', function(req, res){
            console.log('*enter saveNote*');
            notes(req.ctx).saveNote(req.body, resultHandler(res));
        });

        app.del('/api/notes/:id', function(req, res){
            console.log('*enter deleteNote*');
            notes(req.ctx).deleteNote(req.params.id, resultHandler(res));
        });

        done();
    }
};
