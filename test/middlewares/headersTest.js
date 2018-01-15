'use strict';

const expect = require('chai').expect;
const headers = require('../../middlewares/headers');
const sinon = require('sinon');

describe('middleware: headers', function(){
  let req, res, next, key, value;

  beforeEach(function() {
    res = { header: sinon.spy() };
    req = { method: sinon.spy() };
    next = sinon.spy();
    headers(req, res, next);
  });

  describe('when setting access control', function() {
    beforeEach(function() {
      key = "Access-Control-Allow-Origin";
      value = "*";
    });

    it('uses correct values', function() {
      expect(res.header.calledWith(key, value)).to.be.true;
    });
  });

  describe('when setting methods', function() {
    beforeEach(function() {
      key = "Access-Control-Allow-Methods";
      value = "GET, PUT, POST, DELETE, OPTIONS";
    });

    it('uses correct values', function() {
      expect(res.header.calledWith(key, value)).to.be.true;
    });
  });

  describe('when setting headers', function() {
    beforeEach(function() {
      key = "Access-Control-Allow-Headers";
      value = "Content-Type, Authorization, Content-Length, X-Requested-With";
    });

    it('uses correct values', function() {
      expect(res.header.calledWith(key, value)).to.be.true;
    });
  });

  describe('when moving to next middleware', function() {
    it('calls next', function() {
      expect(next.called).to.be.true;
    });
  });

  describe('when the request method is options', function( ){
    let headersObject = {};
    beforeEach(function() {
      res = { header: sinon.spy(), writeHead: sinon.spy(), end: sinon.spy() };
      req = { method: 'OPTIONS' };
      headersObject["Access-Control-Allow-Origin"] = "*";
      headersObject["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headersObject["Access-Control-Allow-Credentials"] = false;
      headersObject["Access-Control-Max-Age"] = '86400';
      headersObject["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      headers(req, res, next);
    })

    it('sends a 200 response with headers', function() {
      expect(res.writeHead.calledWith(200, headersObject)).to.be.true;
    })
  })
});
