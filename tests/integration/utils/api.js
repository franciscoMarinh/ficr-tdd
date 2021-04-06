const ApppController = require('../../../src/app');
const request = require('supertest');

const { app } = new ApppController();

const { post, get, put, delete: del } = request(app);

module.exports = { post, get, put, del };
