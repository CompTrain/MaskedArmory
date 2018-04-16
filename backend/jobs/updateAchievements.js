const axios = require('axios');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const objectId = mongo.ObjectId;

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

const url = config.get('db_connection_string');
const dbName = config.get('db_name');

const achievementObjectId = "5a9f580dc583c307449c93fb";

const ACHIEVEMENTS_API_URL='https://us.api.battle.net/wow/data/character/achievements?locale=en_US&apikey=sjxaqvh2pz4xgrbueauunvshpmw4s7fv';

axios.get(ACHIEVEMENTS_API_URL)
    .then((response) => {
        let achievementList = response.data.achievements;

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const collection = db.collection('achievements');
            collection.updateOne({ _id : objectId(achievementObjectId) }
                , { $set: { achievements : achievementList } }, function(err, result) {
                    console.log("Updated achievement list...");
                });
            client.close();
        });
    })
    .catch((error) => {
        console.log(error);
    });