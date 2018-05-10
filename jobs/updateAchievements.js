const axios = require('axios');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const objectId = mongo.ObjectId;

updateAchievements();

async function updateAchievements() {
    process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
    const config = require('config');

    const url = config.get('db_connection_string');
    const dbName = config.get('db_name');
    const achievementObjectId = config.get('achievements_object_id');
    const ACHIEVEMENTS_API_URL = 'https://us.api.battle.net/wow/data/character/achievements?locale=en_US&apikey=' + config.get('achievements_api_key');

    const achievementData = await axios.get(ACHIEVEMENTS_API_URL);
    const achievementList = achievementData.data.achievements;

    const db = await MongoClient.connect(url);
    const collection = db.collection(dbName);

    try {
        const res = await collection.updateOne(
            { _id : objectId(achievementObjectId) },
            { $set: { achievements : achievementList }
        });

        console.log("Updated achievement list...");
    } finally {
        db.close();
    }
}