const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressMongoDb = require('express-mongo-db');

require('dotenv').config({ silent: true });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(expressMongoDb(process.env.MONGO_CONNECTION));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routes'));

if (process.env.HOST_LISTENER == true) {
    app.listen(5000, '172.26.73.152', () => {
        console.log(`Masked Armory API listening on port 5000!`);
    });
} else {
    app.listen(5000, () => {
        console.log(`Masked Armory API listening on port 5000!`);
    });
}


