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

describe('Create Armory', () => {

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

    describe('/GET server lists', () => {

        it('200 - Should get all US servers', (done) => {
            supertest(app)
                .get('/v1/server/us')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');

                    res.body.should.have.include.key('status');
                    res.body.should.have.property('status', 'success');

                    res.body.should.have.include.key('data');
                    expect(res.body).to.have.nested.property('data.usServers');

                    done();
                });
        });

        it('200 - Should GET all EU servers', (done) => {
            supertest(app)
                .get('/v1/server/eu')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    res.body.should.be.a('object');

                    res.body.should.have.include.key('status');
                    res.body.should.have.property('status', 'success');

                    res.body.should.have.include.key('data');
                    expect(res.body).to.have.nested.property('data.euServers');

                    done();
                });
        });
    });
});