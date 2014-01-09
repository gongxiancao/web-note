var dal = require('./dal');

module.exports = {
    initialize: function (options, done) {
        done();
    },
    config: function (app, options, done) {
        function TenantHandler (req, res, next) {
            req.ctx={};
            req.ctx.tenant = req.query.tenant;
            req.ctx.user = 1;
            next();
        }
        app.use(TenantHandler);

        app.get('/api/notes', function(req, res){
            dal(req.ctx).queryNotes(function (items) {
                res.json(item);
            });
        });

        app.get('/api/notes/:id', function (req, res) {
            dal(req.ctx).getNote(req.params.id, function (items) {
                res.json(item);
            });
        });

        app.post('/api/notes', function(req, res){
            dal(req.ctx).createNote(req.body, function (items) {
                res.json(item);
            });
        });

        app.put('/api/notes/:id', function(req, res){
            dal(req.ctx).updateNote(req.params.id, req.body, function (items) {
                res.json(item);
            });
        });

        app.del('/api/notes/:id', function(req, res){
            dal(req.ctx).deleteNote(req.params.id, function (items) {
                res.json(item);
            });
        });

        done();
    }
};
