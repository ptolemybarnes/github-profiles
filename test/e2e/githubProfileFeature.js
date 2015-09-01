var mock = require('protractor-http-mock');

describe('GitHub profile finder', function() {
  
  beforeEach(function() {
    mock(['githubUserSearch.js']);
  });

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
        toEqual('4');
  });

  afterEach(function(){
    mock.teardown();
  });

});
