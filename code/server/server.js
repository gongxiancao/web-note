'use strict';

var dataServer = require('./data-server'),
    staticServer = require('./static-server'),
    fullDir = require('path').resolve(__dirname + '/../build'),
    express = require('express'),
    app = express(),
    argv = require('optimist')
    .boolean('production')
    .default({port: '8000'})
    .usage('Usage: $0 --production --port [number]')
    .describe('production', 'use production build')
    .describe('port', 'the port of the server. default is 8421')
    .describe('debug', 'show debug messages')
    .argv,
    options = {production: argv.production, port: 8421, path: fullDir};

console.info('Setting up server');

dataServer.initialize(options, function (err) {
    if(err) {
        console.error(err);
        return;
    }
    staticServer.initialize(options, function (err) {
        if(err) {
            console.error(err);
            return;
        }
        app.use(express.bodyParser());
        dataServer.config(app, options, function (err) {
            if(err) {
                console.error(err);
                return;
            }
            staticServer.config(app, options, function (err) {
                if(err) {
                    console.error(err);
                    return;
                }

                // launch the application
                app.listen(options.port);
                console.info('Starting server on port ' + options.port + ' at ' + options.path);
            });
        });
    });
});

module.exports = app;