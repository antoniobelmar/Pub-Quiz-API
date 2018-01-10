const supertest = require('supertest');
const assert = require('assert');
const app = require('../../index');
const Quiz = require('../../models/quiz');

describe('api route', function() {
  it('should return Ok', function(done) {
    supertest(app)
    .get('/api/quiz/1')
    .expect(200)
    .end(done);
  })

  it('should say not found is quiz does not exist', function(done) {
    supertest(app)
    .get('/api/quiz/1')
    .expect(200)
    .end(function(err, response) {
      assert.ok(JSON.stringify(response.body) === '{"error":"Not Found"}')
      return done();
    })
  })

  it('should return quiz if it exists', function(done) {
    Quiz.findOne({}, function(err, quiz) {
      if (err) {
        console.log(err);
      } else {
        supertest(app)
        .get('/api/quiz/' + quiz.id)
        .expect(200)
        .end(function(err, response) {
          assert.ok(JSON.stringify(response.body) === JSON.stringify(quiz));
          return done();
        })
      }
    })
  })
})
