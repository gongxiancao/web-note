function MetaServer (options) {
    this.options = {
        db: options.db
    };
    this.db = this.options.db;
    this._collection = this.db.collection('MetaServer_');
}

function CollectionMeta (collection, metaData) {
    this.data = metaData;
    this.collection = collection;
    this.idFn = this._getIdFn();
}

function noop(callback) { process.nextTick(callback); }

CollectionMeta.prototype._getIdFn = function () {
    var meta = this;

    function nextAutoIncId (callback) {
        meta.collection.update({_id: meta.data._id}, {$inc: { nextId: 1}}, function (err, obj) {
            console.log(obj);
            callback(err, obj);
        });
    }

    function autoIncIdFn (obj, callback) {
        if(obj._id === undefined) {
            nextAutoIncId( function (id) {
                obj._id = id;
                callback();
            });
        }
        else {
            process.nextTick(callback);
        }
    }

    return this.idType === 'autoInc'? autoIncIdFn : noop;
}

CollectionMeta.prototype.applyConstraint = function (obj, callback) {
    this.idFn(obj, callback);
};

MetaServer.prototype.ensureCollectionMeta = function (meta, callback) {
    this._collection.insert(meta, function (err, data) {
        callback(err, null);
    });
};

MetaServer.prototype.getCollectionMeta = function (id, callback) {
    var that = this;
    that._collection.findOne({_id:id}, function (err, data) {
        if(err) {
            callback(err, null);
        }
        else {
            callback(null, new CollectionMeta(that._collection, data));
        }
    });
};


module.exports = MetaServer;
