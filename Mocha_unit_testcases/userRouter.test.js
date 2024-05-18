const express = require('express');
const request = require('supertest');
const router = require('../routes/userRouter'); // assuming the router is in a file called router.js
const apiAuth = require('../helper/apiAuthentication');

describe('User Router', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(router);
  });

  it('should respond with a resource on GET /', (done) => {
    request(app)
    .get('/')
    .expect(200)
    .expect('respond with a resource')
    .end(done);
  });

  it('should register a user on POST /v1/register', (done) => {
    const userData = { /* sample user data */ };
    request(app)
    .post('/v1/register')
    .send(userData)
    .expect(201)
    .end(done);
  });
});