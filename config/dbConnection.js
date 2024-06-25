var mongo = require('mongodb');

var connMongoDB = function() {
    var uri = "mongodb://localhost:27017/";
    
    var client = new mongo.MongoClient(uri, {
        serverApi: {
            version: mongo.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    return client;
}

module.exports = function() {
    return connMongoDB;
}