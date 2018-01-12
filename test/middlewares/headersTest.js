'use strict';

const expect = require('chai').expect;
const headers = require('../../middlewares/headers');
const sinon = require('sinon');

describe('middleware: headers', function(){
  var res, next, key, value;

  beforeEach(function() {
    res = { header: sinon.spy() };
    next = sinon.spy();
    headers(null, res, next);
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

  describe('when setting headers', function() {
    beforeEach(function() {
      key = "Access-Control-Allow-Headers";
      value = "Origin, X-Requested-With, Content-Type, Accept";
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
});

