process.env.NODE_ENV = 'test';

// Require testing dependencies.
const mocha = require('mocha');
const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const should = chai.should();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const fs = require('fs');
const dookie = require('dookie');
const expect = chai.expect;

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

describe('Get Armory', () => {

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

    describe('/GET specific character armory', () => {

        it('200 - Should GET the armory for the specific character with ID 59fe18b7eae53c6e845e743a', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743a';

            supertest(app)
                .get('/v1/armory/' + armoryId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');

                    res.body.should.have.include.key('status');
                    res.body.should.have.property('status', 'success');

                    res.body.should.have.include.key('data');
                    expect(res.body).to.have.nested.property('data.armory');

                    done();
                });
        });

        it('404 - Should get an error as the ID 59fe18b7eae53c6e845e743b does not exist', (done) => {
            let armoryId = '59fe18b7eae53c6e845e743b';

            supertest(app)
                .get('/v1/armory/' + armoryId)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');

                    res.body.should.have.include.key('status');
                    res.body.should.have.property('status', 'error');

                    res.body.should.have.include.key('message');
                    res.body.should.have.property('message', 'Armory not found.');

                    done();
                });
        });
    });
});