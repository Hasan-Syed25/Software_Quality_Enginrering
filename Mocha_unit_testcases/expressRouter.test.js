const express = require('express');
const request = require('supertest');

const router = require('../routes/expenseRouter');

describe('Expense Router', () => {
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

  it('should add an expense on POST /v1/add', (done) => {
    const expenseData = { /* sample expense data */ };
    request(app)
     .post('/v1/add')
     .send(expenseData)
     .expect(500)
     .end(done);
  });

  it('should view group expenses on POST /v1/group', (done) => {
    const groupId ='some-group-id';
    request(app)
     .post('/v1/group')
     .send({ groupId })
     .expect(200)
     .end(done);
  });

  it('should view user expenses on POST /v1/user', (done) => {
    const userId ='some-user-id';
    request(app)
     .post('/v1/user')
     .send({ userId })
     .expect(200)
     .end(done);
  });

  //...
});