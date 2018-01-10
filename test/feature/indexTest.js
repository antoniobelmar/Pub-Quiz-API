'use strict';
const Browser = require('zombie');
const expect = require('chai').expect;

Browser.localhost('example.com', 5000);

describe('User visit index page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  it('should be successful', function() {
    browser.assert.success();
  });

  it('the page should show Welcome to React', function() {
    expect(browser.text('body')).contain('Welcome to React')
  });
});
