const mongo = require('mongodb');
const objectId = mongo.ObjectId;

/**
 * Looks through Mongo for a ID match for the passed armory ID.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function findArmory(req, res) {
    const profileId = req.params.id;
    const collection = req.db.collection('armories');

    try {
        let document = await collection.findOne({_id: objectId(profileId)});

        if (!isEmpty(document)) {
            return res.status(200).json({ status: 'success', data: { armory: document.data }});
        } else {
            return res.status(404).json({ status: 'error', message: 'Armory not found.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'error', message: err });
    }
}

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

module.exports = findArmory;