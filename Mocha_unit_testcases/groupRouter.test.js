const express = require('express');
const request = require('supertest');
const router = require('../routes/groupRouter'); // assuming the router is in a file called router.js

describe('Group Router', () => {
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

  it('should delete a group on DELETE /v1/delete', (done) => {
    const groupId ='some-group-id';
    request(app)
     .delete(`/v1/delete/${groupId}`)
     .expect(204)
     .end(done);
  });
});