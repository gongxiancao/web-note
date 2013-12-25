var entityMeta = require('./entity-meta'),
    events = require('events'),
    util = require('util');

var undefinedEntityTypeMessage = 'Undefined entity type: ';

function buildEntityMetaArray (entityMeta) {
    var array = [];
    for (var p in entityMeta) {
        entityMeta[p]._id = p;
        array.push(entityMeta[p]);
    }
    return array;
}

var entityMetaArray = buildEntityMetaArray(entityMeta);

function EntityServer (options) {
    this.options = {
        db: options.db,
        metaServer: options.metaServer
    };
    this.db = this.options.db;
    this.metaServer = this.options.metaServer;
    this.entityCollection = {};
    this.onAfterInitializing = 'onAfterInitializing';
    this.onBeforeSavingItem = 'onBeforeSavingItem';
}

util.inherits(EntityServer, events.EventEmitter);

EntityServer.prototype.init = function (callback) {
    this.metaServer.ensureCollectionMeta(entityMetaArray, callback);
    this.emit(this.onAfterInitializing, this);
};

EntityServer.prototype._collection = function (type) {
    var col = this.entityCollection[type];
    if(col) {
        return col;
    }
    if(entityMeta[type]) {
        col = this.db.collection('Entity_' + type);
        this.entityCollection[type] = col;
    }
    return col;
};

EntityServer.prototype.guardGetCollection = function (options, callback) {
    var col = this._collection(options.type);
    if(!col) {
        callback(new Error(undefinedEntityTypeMessage + options.type));
    }
    return col; 
}

EntityServer.prototype.query = function (options, callback) {
    var col = this.guardGetCollection(options, callback);
    if(col) {
        col.find(options).toArray(callback);
    }
};

EntityServer.prototype.get = function (options, callback) {
    var col = this.guardGetCollection(options, callback);
    if(col) {
        col.findOne(options, function(err, items) {
            callback(err, items? items[0] : null);
        });
    }
};

EntityServer.prototype.del = function (options, callback) {
    var col = this.guardGetCollection(options, callback);
    if(col) {
        col.del(options, callback);
    }
};

EntityServer.prototype.save = function (entity, callback) {
    var col = this.guardGetCollection(entity, callback);
    if(col) {
        this.emit(this.onBeforeSavingItem, entity);
        col.save(entity, callback);
    }
};

module.exports = EntityServer;
