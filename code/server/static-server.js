var express = require('express');

module.exports = {
    initialize: function (options, done) {
        done();
    },
    config: function (app, options, done) {
        //app.use(express.logger());

        if(!options.production) {
            var lessMiddleware = require('less-middleware');

            app.use(lessMiddleware({
                src: options.path
            }));
        }

        app.use('/', express.static(options.path));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        done();
    }
}
