const expect = require('chai').expect;
const getQuiz = require('../../controllers/quizActions/getQuiz');
const sinon = require('sinon');

describe('getQuiz', function(){
  var request, res, quizModel;

  beforeEach(function(){
    request = { params: { id: 7 } };
    quizModel = {};
    res = { json: sinon.spy() };
  });

  describe('when error is raised', function() {
    let error;

    beforeEach(function(){
      quizModel.findById = function(id, callback) {
        callback(true);
      };
      error = { error: "Not Found" };
      getQuiz(request, res, null, quizModel);
    });

    it('should send json error message', function() {
      expect(res.json.calledWith(error)).to.be.true;
    });
  });

  describe('when quiz is found', function() {
    beforeEach(function() {
      quizModel.findById = function(id, callback) {
        callback(false, 5);
      };
      getQuiz(request, res, null, quizModel);
    });

    it('should send json', function() {
      expect(res.json.calledWith(5)).to.be.true;
    });
  });
});
