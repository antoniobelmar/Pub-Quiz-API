const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Quiz = require('../../models/quiz');
const assert = require('assert');

describe('api route', function() {
  after(function() {
    mongoose.disconnect();
  });

  it('should return Ok', function(done) {
    supertest(app)
    .get('/quiz/1')
    .expect(200, done);
  });

  it('should say not found is quiz does not exist', function(done) {
    supertest(app)
      .get('/quiz/1')
      .expect(200)
      .end(function(err, response) {
        assert.ok(JSON.stringify(response.body) === '{"error":"Not Found"}') 
        return done();
      });
  });

  it('should return quiz if it exists', function(done) {
    Quiz.findOne({}, function(err, quiz) {
      if (err) {
        throw err
      };
      supertest(app)
        .get('/quiz/' + quiz.id)
        .expect(200)
        .end(function(err, response) {
          assert.ok(JSON.stringify(response.body) === JSON.stringify(quiz));
          return done();
        });
    });
  });
});


