const mongo = require('mongodb');
const express = require('express');
const router = express.Router();
const objectId = mongo.ObjectId;

require('dotenv').config({ silent: true });

const blizzard = require('blizzard.js').initialize({
    apikey: process.env.BATTLENET_API_KEY
});

const totalAchievementCounts = {
    'General': 62,
    'Quests': 291,
    'Exploration': 189,
    'Player vs Player': 318,
    'Dungeons & Raids': 957,
    'Professions': 263,
    'Reputation': 93,
    'World Events': 233,
    'Pet Battles': 143,
    'Collections': 94,
    'Class Hall': 37,
    'Draenor Garrison': 121,
    'Scenarios': 77
};

router.post('/armory/create', (req, res) => {
    const realm = req.body.serverName.replace(/\\/g, '');
    const name = req.body.characterName;
    const origin = req.body.region;
    const locale = 'en_US';
    const keys = 'stats,professions,titles,items,reputation,mounts,pets,achievements';

    blizzard.wow.character(keys, {realm, name, origin, locale})
        .then((response) => {
            const armoryData = response.data;

            let achievementsCompleted = armoryData.achievements.achievementsCompleted;
            const achievementsCollection = req.db.collection('achievements');

            achievementsCollection.findOne({"_id": objectId(process.env.ACHIEVEMENTS_MONGO_OBJECT_ID)}, function(err, achievementList) {

                let achievementCounts = {};
                let categoryAchievements = null;

                let achievementHeaders = achievementList.achievements;
                let achievementHeadersLength = achievementHeaders.length;

                achievementCounts['Total'] = {};
                achievementCounts['Total']['count'] = 0;
                achievementCounts['Total']['total'] = 0;

                for (let i = 0; i < achievementHeadersLength; i++) {

                    if (typeof achievementHeaders[i].categories !== 'undefined') {
                        categoryAchievements = achievementHeaders[i].categories;
                    }

                    let achievements = achievementHeaders[i].achievements;
                    let achievementsLength = achievements.length;

                    let specificAchievementCount = 0;
                    let specificAchievementHeaderName = achievementHeaders[i].name;

                    if (specificAchievementHeaderName == 'Legacy' || specificAchievementHeaderName == 'Feats of Strength') {

                        let specificAchievementDetails = [];

                        if (categoryAchievements != null) {

                            let numberOfCategories = categoryAchievements.length;

                            for (let k = 0; k < numberOfCategories; k++) {

                                let numberOfCategoryAchievements = categoryAchievements[k].achievements.length;

                                for (let l = 0; l < numberOfCategoryAchievements; l++) {
                                    if (achievementsCompleted.includes(categoryAchievements[k].achievements[l].id)) {
                                        specificAchievementCount++;
                                        specificAchievementDetails.push(categoryAchievements[k].achievements[l]);
                                    }
                                }
                            }
                        }

                        // Loop through the top level achievements that are not in categories.
                        for (let j = 0; j < achievementsLength; j++) {
                            if (achievementsCompleted.includes(achievements[j].id)) {
                                specificAchievementCount++;
                                specificAchievementDetails.push(achievements[j]);
                            }
                        }

                        achievementCounts[specificAchievementHeaderName] = {};
                        achievementCounts[specificAchievementHeaderName]['count'] = specificAchievementCount;
                        achievementCounts[specificAchievementHeaderName]['achievements'] = specificAchievementDetails;

                    } else {

                        if (categoryAchievements != null) {

                            let numberOfCategories = categoryAchievements.length;

                            for (let k = 0; k < numberOfCategories; k++) {

                                let numberOfCategoryAchievements = categoryAchievements[k].achievements.length;

                                for (let l = 0; l < numberOfCategoryAchievements; l++) {
                                    if (achievementsCompleted.includes(categoryAchievements[k].achievements[l].id)) {
                                        specificAchievementCount++;
                                    }
                                }
                            }
                        }

                        // Loop through the top level achievements that are not in categories.
                        for (let j = 0; j < achievementsLength; j++) {
                            if (achievementsCompleted.includes(achievements[j].id)) {
                                specificAchievementCount++;
                            }
                        }

                        // The period was breaking the mongo insert.
                        if (specificAchievementHeaderName == 'Player vs. Player') {
                            specificAchievementHeaderName = 'Player vs Player';
                        }

                        achievementCounts[specificAchievementHeaderName] = {};
                        achievementCounts[specificAchievementHeaderName]['count'] = specificAchievementCount;
                        achievementCounts[specificAchievementHeaderName]['total'] = totalAchievementCounts[specificAchievementHeaderName];

                        achievementCounts['Total']['count'] = achievementCounts['Total']['count'] + specificAchievementCount;
                        achievementCounts['Total']['total'] = achievementCounts['Total']['total'] + totalAchievementCounts[specificAchievementHeaderName];
                    }
                }

                armoryData['achievementCounts'] = achievementCounts;

                // We reformulated the achievement counts, so we don't need to store all of the achievement data anymore.
                delete armoryData['achievements'];

                // Need the origin to be in the data store so that we know where to pull
                // character image renders from the Aurelia side on armory display.
                armoryData['origin'] = origin;

                const armoryCollection = req.db.collection('armories');
                const armoryDataFormatted = {'data': armoryData};

                armoryCollection.insert(armoryDataFormatted, function(err) {

                    if (err) {
                        return res.status(500).json({err});
                    }

                    const objectId = armoryDataFormatted._id;

                    res.status(200).json({ profileId: objectId });
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err.response.data)
        });
});

router.get('/armory/find/:id', (req, res) => {
    const profileId = req.params.id;

    const collection = req.db.collection('armories');

    collection.findOne({_id: objectId(profileId)}, function(err, document) {
        if (err) res.status(404).error('Armory not found.');

        res.status(200).json({ armory: document.data});
    });
});

router.get('/server/us/list', (req, res) => {
    const collection = req.db.collection('usServerList');

    collection.find({}).toArray(function(err, servers) {
        if (err) res.status(404).error('Error retrieving US server list.');

        res.status(200).json({ usServers: servers})
    });
});

router.get('/server/eu/list', (req, res) => {
    const collection = req.db.collection('euServerList');

    collection.find({}).toArray(function(err, servers) {
        if (err) res.status(404).error('Error retrieving EU server list.');

        res.status(200).json({ euServers: servers})
    });
});


module.exports = router;