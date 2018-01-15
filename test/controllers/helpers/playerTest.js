'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const playerModule = require('../../../controllers/wsActions/helpers/player');

describe('Player', function() {
  let player, ws;

  beforeEach(function() {
    ws = sinon.spy();
    player = new playerModule.Player(ws);
    player._score = 5;
  });

  describe('#score (get)', function() {
    it('returns _score', function() {
      expect(player.score).to.equal(5);
    });
  });

  describe('#addPoint', function() {
    beforeEach(function() {
      player.addPoint();
    });

    it('increments score', function() {
      expect(player._score).to.equal(6);
    });
  });
});

describe('newPlayer', function() {
});
