const mongo = require('mongodb');
const objectId = mongo.ObjectId;

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
let config = require('config');

const blizzard = require('blizzard.js').initialize({
    apikey: config.get('wow_api_key')
});

// There is not a way to build these counts dynamically at the moment,
// so we have to get these counts of the game directly.
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

/**
 * Handles the creation of the actual armory by pulling information from Blizzard's API for WoW.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createArmory(req, res) {
    const realm = req.body.serverName.replace(/\\/g, '');
    const name = req.body.characterName;
    const origin = req.body.region;
    const locale = 'en_US';
    const keys = 'stats,professions,titles,items,reputation,mounts,pets,achievements,progression,pvp';

    blizzard.wow.character(keys, {realm, name, origin, locale})
        .then(async (response) => {
            const armoryData = response.data;

            // ****** START :: Handling Raid Zone Progression for T18-T21 ********

            // Current tier zones -- T18-T21 -- Legion Expansion
            const raidList = armoryData.progression.raids;
            const raidZones = ['The Emerald Nightmare', 'Trial of Valor', 'The Nighthold', 'Tomb of Sargeras', 'Antorus, the Burning Throne'];

            const raidZoneData = raidZones.map((raidZone) => {
                for (let zone in raidList) {
                    if (raidList[zone].name == raidZone) {
                        return raidList[zone];
                    }
                }
            });

            delete armoryData['progression'];
            armoryData['progression'] = raidZoneData;

            // ****** END :: Handling Raid Zone Progression for T18-T21 ********

            // ****** START :: Achievement Manipulation ********

            let achievementsCompleted = armoryData.achievements.achievementsCompleted;
            const achievementsCollection = req.db.collection('achievements');

            let achievementList = await achievementsCollection.findOne({"_id": objectId(config.get('achievements_object_id'))});

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

                if (specificAchievementHeaderName === 'Legacy' || specificAchievementHeaderName === 'Feats of Strength') {

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
                    if (specificAchievementHeaderName === 'Player vs. Player') {
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

            // ****** END :: Achievement Manipulation ********

            // Need the origin to be in the data store so that we know where to pull
            // character image renders from the Vue side on armory display.
            armoryData['origin'] = origin;

            const armoryCollection = req.db.collection('armories');
            const armoryDataFormatted = {'data': armoryData};

            try {
                await armoryCollection.insert(armoryDataFormatted);
                const objectId = armoryDataFormatted._id;
                return res.status(200).send({ status: 'success', data: { profileId: objectId }});
            } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 'error', message: err })
            }
        });
}

module.exports = createArmory;