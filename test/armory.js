process.env.NODE_ENV = 'test';

// Require testing dependencies.
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const fs = require('fs');
const dookie = require('dookie');

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

chai.use(chaiHttp);

describe('Armory', () => {
    before(async () => {

        const url = config.get('db_connection_string');
        const dbName = config.get('db_name');

        // Drop the test database to remove all of the test data.
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            db.dropDatabase();
        });

        // Recreate the test database.
        MongoClient.connect(url);

        // Populate the test database with test data.
        const testData = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));
        await dookie.push(config.get('db_connection'), testData);
    });

    describe('/POST to create new armory', () => {

        it('it should POST a new armory and return the new profile ID', (done) => {
            let armoryData = {
                serverName: "Emerald Dream",
                characterName: "Github",
                region: 'us'
            };

            chai.request(app)
                .post('/armory/create')
                .send(armoryData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.key('profileId');
                    done();
                });
        });
    });

    describe('/GET specific character armory', () => {

        it('it should GET the armory for the specific character with ID 59fe18b7eae53c6e845e743a', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743a';

            chai.request(app)
                .get('/armory/find/' + armoryId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.key('armory');
                    res.body.armory.should.include.keys(['items', 'titles', 'mounts', 'pets', 'achievements', 'reputation', 'professions', 'stats']);
                    done();
                });
        });

        it('it should GET a 404 error as the ID 59fe18b7eae53c6e845e743b does not exist', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743b';

            chai.request(app)
                .get('/armory/find/' + armoryId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.include.key('error');
                    res.body.should.have.property('error', 'Armory not found.');
                    done();
                });
        });
    });

    describe('/GET server lists', () => {

        it('it should GET all US servers', (done) => {
            chai.request(app)
                .get('/server/us/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.key('usServers');
                    done();
                });
        });

        it('it should GET all EU servers', (done) => {
            chai.request(app)
                .get('/server/eu/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.key('euServers');
                    done();
                });
        });
    });
});