const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "conway";
const client = new MongoClient(dbUrl, {useNewUrlParser: true});

const getDb = async () => {
    if(!client.isConnected()){
        await client.connect();
    }
    return client.db(dbName);
}

module.exports.getDb = getDb;
