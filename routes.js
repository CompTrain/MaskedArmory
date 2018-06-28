const express = require('express');
const router = express.Router();

const createArmory = require('./app/createArmory');
const findArmory = require('./app/findArmory');
const getServers = require('./app/getServers');
const reportBug = require('./app/reportBug');

router.post('/v1/armory', createArmory);
router.get('/v1/armory/:id', findArmory);
router.get('/v1/server/us', getServers.getUsServers);
router.get('/v1/server/eu', getServers.getEuServers);
router.post('/v1/report-bug', reportBug);

module.exports = router;