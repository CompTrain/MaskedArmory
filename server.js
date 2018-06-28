const cluster = require('cluster');

if (process.env.NODE_ENV === 'test' || !cluster.isMaster) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const expressMongoDb = require('express-mongo-db');

    process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
    const config = require('config');

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(expressMongoDb(config.get('db_connection')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/', require('./routes'));

    if (config.util.NODE_ENV === 'production') {
        module.exports = app.listen(5000, config.get('production_ip_address'), () => {
            console.log(`Production -- Masked Armory API listening on port 5000!`);
        });
    } else {
        module.exports = app.listen(5000, () => {
            console.log(`Development -- Masked Armory API listening on port 5000!`);
        });
    }
} else {
    manageCluster();
}

function manageCluster() {
    let numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}