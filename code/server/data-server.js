var express = require('express'),
    MetaServer = require('./meta'),
    EntityServer = require('./entity'),
    MongoClient = require('mongodb').MongoClient,
    fullDir = require('path').resolve(__dirname + "/../app");

var app = express(),
    entityServer;


function configServer(server, options) {
    server.use(express.logger());

    if(!options.production) {
        var lessMiddleware = require('less-middleware');

        server.use(lessMiddleware({
            src: fullDir
        }));
    }

    server.use('/', express.static(fullDir));
    server.use(express.bodyParser());
    server.use(express.methodOverride());

    server.get('/data/entity/:type', function(req, res){
        entityServer.query(req.params, function (err, items) {
            res.json(items);
        });
    });

    server.post('/data/entity/:type', function (req, res) {
        var entity = req.body;
        entityServer.save(entity, function (err, item) {
            res.json(item);
        });
    });

    server.get('/data/entity/:type/:id', function (req, res) {
        entityServer.get(req.params, function (err, item) {
            res.json(item);
        });
    });

    server.del('/data/entity/:type/:id', function(req, res){
        entityServer.del(req.params, function (err, item) {
            res.json(item);
        });
    });
}

exports.start = function (options) {
    console.info('Starting server on port ' + options.port + ' at ' + fullDir);

    MongoClient.connect('mongodb://127.0.0.1:27017/web-note', function(err, db) {
        if(err) throw err;
        var metaServer = new MetaServer({db: db});
        entityServer = new EntityServer({db: db, metaServer: metaServer});

        entityServer.init(function () {
            configServer(app, options);
            app.listen(options.port);
        });
    });
};
