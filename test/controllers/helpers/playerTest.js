'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const playerModule = require('../../../controllers/wsActions/helpers/player');

describe('Player', function() {
  let player, ws;

  beforeEach(function() {
    ws = { send: sinon.spy() };
    player = new playerModule.Player(ws);
    player._score = 5;
  });

  describe('#score (get)', function() {
    it('returns _score', function() {
      expect(player.score).to.equal(5);
    });
  });

  describe('#score (set)', function() {
    beforeEach(function() {
      player.score = 6;
    });

    it('sets score', function() {
      expect(player._score).to.equal(6);
    });
  });

  describe('#ws (get)', function() {
    it('returns _ws', function() {
      expect(player.ws).to.equal(ws);
    });
  });

  describe('#send', function() {
    beforeEach(function() {
      player._ws.OPEN = 1;
    });

    describe('when connected', function() {
      beforeEach(function() {
        player._ws.readyState = 1;
        player.send('msg');
      });

      it('sends message via web socket', function() {
        sinon.assert.calledWith(ws.send, 'msg');
      });
    });

    describe('when connected', function() {
      beforeEach(function() {
        player._ws.readyState = 2;
      });

      it('sends message via web socket', function() {
        expect(function() { player.send('msg') }).to.throw(Error);
      });
    });
  });
});

describe('newPlayer', function() {
});
