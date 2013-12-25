var dataServer = require('./data-server');
var argv = require('optimist')
    .boolean('production')
    .default({port: '8000'})
    .usage('Usage: $0 --production --port [number]')
    .describe('production', 'use production build')
    .describe('port', 'the port of the server. default is 8421')
    .describe('debug', 'show debug messages')
    .argv;


dataServer.start({production: argv.production, port: 8421});