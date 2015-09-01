var mock = require('protractor-http-mock');
mock(['githubUserSearch.js']);

describe('GitHub profile finder', function() {

  it('displays profiles given a search', function() {
    browser.get('http://localhost:8080');

    element(by.model('searchCtrl.searchTerm')).sendKeys('ptolemy');
    element(by.className('btn')).click();

    expect(element(by.binding('user.login')).getText()).
        toEqual('ptolemybarnes');
  });

  it('displays the number of repos belonging to the user', function() {
    browser.get('http://localhost:8080');
    
    element(by.model('searchCtrl.searchTerm')).sendKeys('ptolemy');
    element(by.className('btn')).click();
    
    expect(element(by.binding('user.repoCount')).getText()).
        toEqual('30');
  });

  afterEach(function(){
    mock.teardown();
  });

});
