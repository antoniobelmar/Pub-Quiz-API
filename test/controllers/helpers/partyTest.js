'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const partyModule = require('../../../controllers/wsActions/helpers/party');

describe('Party', function() {
  let party, player_constructor, player;

  beforeEach(function() {
    party = new partyModule.Party('url');
    player = { send: sinon.spy(), ws: 5 };
    player_constructor = sinon.stub().returns(player);
  });

  describe('#getPlayer', function() {
    beforeEach(function() {
      party._players = [player];
    });

    describe('when player exists', function() {
      it('returns matching player', function() {
        expect(party.getPlayer(5)).to.equal(player);
      });
    });

    describe('when player does not exist', function() {
      it('returns matching player', function() {
        expect(party.getPlayer(6)).to.be.undefined;
      });
    });
  });

  describe('#setLeader', function() {
    beforeEach(function() {
      party.setLeader(5);
    });

    it('sets _leader', function() {
      expect(party._leader).to.equal(5);
    });
  });

  describe('#hasLeader', function() {
    describe('when has leader', function() {
      beforeEach(function() {
        party._leader = true;
      });

      it('returns true', function() {
        expect(party.hasLeader()).to.equal(true);
      });
    });

    describe('when has no leader', function() {
      it('returns false', function() {
        expect(party.hasLeader()).to.equal(false);
      });
    });
  });

  describe('#isLeader', function() {
    beforeEach(function() {
      party._leader = 5;
    });

    describe('when is leader', function() {
      it('returns true', function() {
        expect(party.isLeader(5)).to.be.true;
      });
    });

    describe('when is not leader', function() {
      it('returns false', function() {
        expect(party.isLeader(6)).to.be.false;
      });
    });
  });

  describe('#addPlayer', function() {
    beforeEach(function() {
      party.addPlayer(0, player_constructor);
    });

    it('creates player', function() {
      sinon.assert.calledWith(player_constructor, 0);
    });

    it('keeps reference to player', function() {
      expect(party._players).to.include(player);
    });
  });

  describe('#broadcast', function() {
    let send;

    beforeEach(function() {
      send = sinon.spy();  
      sinon.stub(party, 'getSend').returns(send);
      sinon.spy(party._players, 'forEach');
      party.broadcast();
    });

    it('applies send to party array', function() {
      sinon.assert.calledWith(party._players.forEach, send);
    });
  });

  describe('#getSend', function() {
    let send;
    
    beforeEach(function() {
      send = party.getSend('msg');
    });

    describe('when connection is open', function() {
      beforeEach(function() {
        send(player);
      });

      it('sends message to player', function() {
        sinon.assert.calledWith(player.send, 'msg');
      });
    });

    describe('when connection is closed', function() {
      beforeEach(function() {
        player.send = sinon.stub().throws();
        send(player);
      });

      it('removes player from list', function() {
        expect(party._players).to.not.include(player);
      });
    });
  });
});

