const expect = require('chai').expect;
const sinon = require('sinon');

const Get = require('../../controllers/quizActions/get');
const Index = require('../../controllers/quizActions/index');
const Post = require('../../controllers/quizActions/post');
const Delete = require('../../controllers/quizActions/delete');


describe('quizController', function() {
  var request, res, quizModel;

  beforeEach(function(){
    request = { params: { id: 7 } };
    quizModel = {};
    res = { json: sinon.spy() };
  });

  describe('Get', function(){
    describe('when error is raised', function() {
      let error;

      beforeEach(function(){
        quizModel.findById = function(id, callback) {
          callback(true);
        };
        error = { error: "Not Found" };
        Get(request, res, null, quizModel);
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
        Get(request, res, null, quizModel);
      });

      it('should send json', function() {
        expect(res.json.calledWith(5)).to.be.true;
      });
    });
  });

  describe('Index', function() {
    describe('when error is raised', function() {
      let error;

      beforeEach(function(){
        quizModel.find = function(query, callback) {
          callback(true);
        };
        error = { error: "Not Found" };
        Index(request, res, null, quizModel);
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
        Index(request, res, null, quizModel);
      });

      it('should send json', function() {
        expect(res.json.calledWith(5)).to.be.true;
      });
    });
  })

  describe('Post', function() {
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
        Post(request, res, quizModel);
      })

      it('should send 200 OK', function() {
        expect(res.send.called).to.be.true;
      })
    })
  })

  describe('Delete', function() {
    describe('when quiz does not exist', function() {
      beforeEach(function() {
        sinon.spy(console, "log");
        quizModel.findByIdAndRemove = function(query, callback) {
          callback(true);
        };
        Delete(request, res, null, quizModel);
      });

      it('should say quiz not found if quiz does not exist', function() {
        expect(console.log.calledWith('Quiz not found')).to.be.true;
      });
    });

    describe('when quiz exists', function() {
      beforeEach(function() {
        res = { send: sinon.spy() };
        quizModel.findByIdAndRemove = function(query, callback) {
          callback(false, 'deletedQuiz');
        };
        Delete(request, res, null, quizModel);
      });

      it('should send a status code of 200', function() {
        expect(res.send.calledWith(200)).to.be.true;
      })
    });
  });
});
