const expect = require('chai').expect;
const Get = require('../../controllers/quizActions/get');
const Index = require('../../controllers/quizActions/index');
const sinon = require('sinon');

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

    describe('when quiz is found', function() {
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
})
