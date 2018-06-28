async function getUsServers(req, res)
{
    const collection = req.db.collection('usServerList');

    try {
        const servers = await collection.find({}).toArray();

        if (servers.length !== 0) {
            return res.status(200).send({ status: 'success', data: { usServers: servers }});
        } else {
            return res.status(404).json({ status: 'error', message: 'Error retrieving US server list.' });
        }
    } catch (err) {
        return res.status(404).send({ status: 'error', 'message': 'Error retrieving US server list.' });
    }
}

async function getEuServers(req, res)
{
    const collection = req.db.collection('euServerList');

    try {
        const servers = await collection.find({}).toArray();

        if (servers.length !== 0) {
            return res.status(200).send({ status: 'success', data: { euServers: servers }});
        } else {
            return res.status(404).json({ status: 'error', message: 'Error retrieving EU server list.' });
        }
    } catch (err) {
        return res.status(404).json({ status: 'error', message: 'Error retrieving EU server list.' });
    }
}

module.exports = {
    getUsServers,
    getEuServers
};