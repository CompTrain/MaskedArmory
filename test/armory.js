process.env.NODE_ENV = 'test';

// Require testing dependencies.
const mocha = require('mocha');
const chai = require('chai');
const supertest = require('supertest');
const server = require('../server');
const should = chai.should();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const fs = require('fs');
const dookie = require('dookie');

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

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

            supertest(server)
                .post('/armory/create')
                .send(armoryData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');
                    res.body.should.include.key('profileId');
                    done();
                });
        });
    });

    describe('/GET specific character armory', () => {

        it('it should GET the armory for the specific character with ID 59fe18b7eae53c6e845e743a', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743a';

            supertest(server)
                .get('/armory/find/' + armoryId)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');
                    res.body.should.include.key('armory');
                    res.body.armory.should.include.keys(['items', 'titles', 'mounts', 'pets', 'achievements', 'reputation', 'professions', 'stats']);
                    done();
                });
        });

        it('it should GET a 404 error as the ID 59fe18b7eae53c6e845e743b does not exist', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743b';

            supertest(server)
                .get('/armory/find/' + armoryId)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.have.include.key('error');
                    res.body.should.have.property('error', 'Armory not found.');
                    done();
                });
        });
    });

    describe('/GET server lists', () => {

        it('it should GET all US servers', (done) => {
            supertest(server)
                .get('/server/us/list')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');
                    res.body.should.include.key('usServers');
                    done();
                });
        });

        it('it should GET all EU servers', (done) => {
            supertest(server)
                .get('/server/eu/list')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');
                    res.body.should.include.key('euServers');
                    done();
                });
        });
    });
});