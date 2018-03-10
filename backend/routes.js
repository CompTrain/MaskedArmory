const mongo = require('mongodb');
const express = require('express');
const router = express.Router();
const objectId = mongo.ObjectId;

require('dotenv').config({ silent: true });

const blizzard = require('blizzard.js').initialize({
    apikey: process.env.BATTLENET_API_KEY
});

router.post('/armory/create', (req, res) => {
    const realm = req.body.serverName;
    const name = req.body.characterName;
    const origin = req.body.region;
    const locale = 'en_US';
    const keys = 'stats,professions,titles,items,reputation,mounts,pets,achievements';

    blizzard.wow.character(keys, {realm, name, origin, locale})
        .then(response => {

            const armoryData = response.data;

            let achievementsCompleted = armoryData.achievements.achievementsCompleted;

            const achievementsCollection = req.db.collection('achievements');
            achievementsCollection.findOne({_id: objectId(process.env.ACHIEVEMENTS_MONGO_OBJECT_ID)}, function(err, achievementList) {

                let categoryAchievements = null;
                let notableAchievements = {};

                let achievementHeaders = achievementList.achievements;
                let achievementHeadersLength = achievementHeaders.length;

                for (let i = 0; i < achievementHeadersLength; i++) {

                    if (typeof achievementHeaders[i].categories !== 'undefined') {
                        categoryAchievements = achievementHeaders[i].categories;
                    }

                    let achievements = achievementHeaders[i].achievements;
                    let achievementsLength = achievements.length;

                    let specificAchievementHeaderName = achievementHeaders[i].name;

                    if (specificAchievementHeaderName == 'Legacy' || specificAchievementHeaderName == 'Feats of Strength') {

                        let specificAchievementDetails = [];

                        if (categoryAchievements != null) {

                            let numberOfCategories = categoryAchievements.length;

                            for (let k = 0; k < numberOfCategories; k++) {

                                let numberOfCategoryAchievements = categoryAchievements[k].achievements.length;

                                for (let l = 0; l < numberOfCategoryAchievements; l++) {
                                    if (achievementsCompleted.includes(categoryAchievements[k].achievements[l].id)) {
                                        specificAchievementDetails.push(categoryAchievements[k].achievements[l]);
                                    }
                                }
                            }
                        }

                        // Loop through the top level achievements that are not in categories.
                        for (let j = 0; j < achievementsLength; j++) {
                            if (achievementsCompleted.includes(achievements[j].id)) {
                                specificAchievementDetails.push(achievements[j]);
                            }
                        }

                        notableAchievements[specificAchievementHeaderName] = {};
                        notableAchievements[specificAchievementHeaderName]['achievements'] = specificAchievementDetails;
                    }
                }

                // We reformulated the achievement counts, so we don't need to store all of the achievement data anymore.
                delete armoryData['achievements'];

                // With the deletion above, we now want to add in the Legacy / FoS items as those are the
                // only ones we are displaying going forward.
                armoryData['achievements'] = notableAchievements;

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

                    res.status(200).json({ armoryId: objectId });
                });
            });
        })
        .catch(err => res.status(500).json(err.response.data));
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