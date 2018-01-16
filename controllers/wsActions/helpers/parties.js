'use strict';

const newParty = require('./party').newParty;

class Parties {
  constructor() {
    this._parties = [];
  };

  add(party) {
    this._parties.push(party);
    return party;
  }

  get(url, constructor = newParty) {
    let party = this._parties.find(function(p) { 
      return p.url == url 
    });
    return party || this.add(constructor(url));
  };

  remove(party) {
    let index = this._parties.indexOf(party);
    if (index > -1) {
      this._parties.splice(index, 1);
    };
  };
};

module.exports.Parties = Parties;
