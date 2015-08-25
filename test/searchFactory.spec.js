describe('factory: Search', function() {
  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));
  
  var httpBackend;
  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
  })); 

  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku"
    } 
  ];

  function stubHttpRequestWithQuery(query) {
    httpBackend
      .when('GET', "https://api.github.com/search/users?q=" + query)
      .respond(
        { items: items }
      );
  }

  it('allows search', function() {
    stubHttpRequestWithQuery('tansaku');
    search.query('tansaku').then(function(response) {
      expect(response.data.items).toEqual(items);  
    });
    httpBackend.flush();
  });
  
  afterEach(function() { 
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
