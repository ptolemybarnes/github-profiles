describe('factory: GitHubRepoCounter', function() {
  var repoCounter;
  
  beforeEach(module('GitUserSearch'));
  
  beforeEach(inject(function(RepoCounter) {
    repoCounter = RepoCounter;
  }));

  var httpBackend;
  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));

  var repoData = [ {}, {}, {} ];

  function stubHttpRequestTo(queryUrl) {
    httpBackend
      .when('GET', queryUrl)
      .respond( repoData );
  }

  it('counts the number of repos for a given user', function() {
    stubHttpRequestTo("https://api.github.com/users/ptolemybarnes/repos");
    repoCounter.query('ptolemybarnes').then(function(response) {
      expect(response.data).toEqual('3');
    });
    httpBackend.flush();
  });

  afterEach(function() { 
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
