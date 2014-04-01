'use strict';

var db = require('pg'),
    selectors = {
            first: 1,
            all: 2
        };
module.exports = function (ctx) {
    var conString = ctx.constr,
        retval = {

            query: function(sql, params, selector, done) {
                var client = new db.Client(conString);
                if(!done) {
                    done = selector;
                    selector = selectors.all;
                }

                client.connect(function(err) {
                    if(err) {
                        return done(err);
                    }

                    client.query(sql, params,
                        function(err, result) {
                            client.end();
                            result = result ? result.rows : result;
                            result = result || [];
                            result = selector === selectors.first? result[0] : result;
                            done(err,  result);
                        });
                });
            }
        };
    return retval;
}

module.exports.selectors = selectors;