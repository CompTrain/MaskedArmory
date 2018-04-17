const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressMongoDb = require('express-mongo-db');

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require('config');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(expressMongoDb(config.get('db_connection')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./armory'));

if (config.util.NODE_ENV === 'production') {
    module.exports = app.listen(5000, '172.26.73.152', () => {
        console.log(`Production -- Masked Armory API listening on port 5000!`);
    });
} else {
    module.exports = app.listen(5000, () => {
        console.log(`Development -- Masked Armory API listening on port 5000!`);
    });
}
