'use strict';

var errors = {
        invalid_input: {
            code: 1,
            status: 500
        },
        internal: {
            code: 2,
            status: 500
        }
    };

for(var key in errors) {
    errors[key].name = key;
}

module.exports = {
    codes: errors,
    wrap: function (err) {
        var error = errors[err.name];
        if(error === err) {
            return err;
        }
        return errors.internal;
    }
};

