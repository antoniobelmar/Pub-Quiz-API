'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const partiesModule = require('../../../controllers/wsActions/helpers/parties');

describe('Parties', function() {
  let parties;

  beforeEach(function() {
    parties = new partiesModule.Parties();
  });

  describe('#add', function() {
    beforeEach(function() {
      parties.add(5);
    });

    it('contains party', function() {
      expect(parties._parties).to.contain(5);
    });
  });

  describe('#get', function() {
    let party;

    beforeEach(function() {
      party = { url: 'url' };
      parties._parties = [party];
    });

    describe('when present', function() {
      it('returns party', function() {
        expect(parties.get('url')).to.equal(party);
      });
    });

    describe('when not present', function() {
      let newParty, output;

      beforeEach(function() {
        newParty = sinon.stub().returns(0);
        sinon.stub(parties, 'add').returns(1);
        output = parties.get('new', newParty);
      });

      it('builds new Party', function() {
        sinon.assert.calledWith(newParty, 'new');
      });

      it('adds new Party', function() {
        sinon.assert.calledWith(parties.add, 0);
      });

      it('returns new Party', function() {
        expect(output).to.equal(1);
      });
    });
  });

  describe('#remove', function() {
    let party;

    beforeEach(function() {
      party = { url: 'url' };
      parties._parties = [party];
      parties.remove(party);
    });

    it('removes matching party', function() {
      expect(parties._parties).to.not.contain(party); 
    });
  });
});
