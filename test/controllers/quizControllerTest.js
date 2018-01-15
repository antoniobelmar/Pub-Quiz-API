const expect = require('chai').expect;
const getQuiz = require('../../controllers/quizActions/getQuiz');
const getAllQuizzes = require('../../controllers/quizActions/getAllQuizzes');
const createQuiz = require('../../controllers/quizActions/createQuiz');
const sinon = require('sinon');

describe('quizController', function() {
  var request, res, quizModel;

  beforeEach(function(){
    request = { params: { id: 7 } };
    quizModel = {};
    res = { json: sinon.spy() };
  });

  describe('getQuiz', function(){
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

  describe('getAllQuizzes', function() {
    describe('when error is raised', function() {
      let error;

      beforeEach(function(){
        quizModel.find = function(query, callback) {
          callback(true);
        };
        error = { error: "Not Found" };
        getAllQuizzes(request, res, null, quizModel);
      });

      it('should send json error message', function() {
        expect(res.json.calledWith(error)).to.be.true;
      });
    });

    describe('when quizzes are found', function() {
      beforeEach(function() {
        quizModel.find = function(query, callback) {
          callback(false, 5);
        };
        getAllQuizzes(request, res, null, quizModel);
      });

      it('should send json', function() {
        expect(res.json.calledWith(5)).to.be.true;
      });
    });
  })

  describe('createQuiz', function() {
    let questionsArray, optionsArray;
    optionsArray = [ { _text: 'optionOne' } ];
    questionsArray = [ {
      _type: 'Multiple choice',
      _text: 'Question?',
      _options: optionsArray,
      _answer: 'Answer'
    } ];
    describe('when quiz is created', function() {
      beforeEach(function() {
        request.body = { questions: questionsArray };
        res = { send: sinon.spy() };
        createQuiz(request, res, quizModel);
      })

      it('should send 200 OK', function() {
        expect(res.send.called).to.be.true;
      })
    })
  })
})
