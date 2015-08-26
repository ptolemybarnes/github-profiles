var mock = require('protractor-http-mock');
mock(['githubUserSearch.js']);

describe('GitHub profile finder', function() {

  it('finds profiles', function() {
    browser.get('http://localhost:8080');

    element(by.model('searchCtrl.searchTerm')).sendKeys('ptolemy');
    element(by.className('btn')).click();

    expect(element(by.binding('user.login')).getText()).
        toEqual('ptolemybarnes');
  });

  afterEach(function(){
    mock.teardown();
  });

});
