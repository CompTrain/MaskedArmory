const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'maskedarmory';

const WOW_API_US_REALMS_URL = 'https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=tzy322vsg3swwxy5s8hj98ejcf6uydau';
const WOW_API_EU_REALMS_URL = 'https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=tzy322vsg3swwxy5s8hj98ejcf6uydau';

axios.get(WOW_API_US_REALMS_URL)
    .then((response) => {
        let serversData = response.data.realms;

        let usServerList = serversData.map((server) => {
            return {
                'name': server.name
            }
        });

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const collection = db.collection('usServerList');
            collection.insertMany(usServerList, () => {
                console.log('Done updating US server list...');
            });
            client.close();
        });
    })
    .catch((error) => {
        console.log(error);
    });


axios.get(WOW_API_EU_REALMS_URL)
    .then((response) => {
        let serversData = response.data.realms;

        let euServerList = serversData.map((server) => {
            return {
                'name': server.name
            }
        });

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const collection = db.collection('euServerList');
            collection.insertMany(euServerList, () => {
                console.log('Done updating EU server list...');
            });

            client.close();
        });
    })
    .catch((error) => {
        console.log(error);
    });
