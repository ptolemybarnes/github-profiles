describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch')); // creating a mock module
  var ctrl;
  
  describe('when user searching for a user', function() {
    var fakeUserInfo, scope, fakeSearch, fakeCounter;

    beforeEach(function(){
      fakeSearch  = jasmine.createSpyObj('fakeSearch',  ['query']);
      fakeCounter = jasmine.createSpyObj('fakeCounter', ['query']) ;
      
      module({
        Search:      fakeSearch,
        RepoCounter: fakeCounter
      });
    });
   
    var gitHubSearchResponse = {
      "items" : [
        {
          "login"     : "tansaku",
          "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
          "html_url"  : "https://github.com/tansaku"
        }
      ]
    }

    var mockUserData = JSON.parse(JSON.stringify(gitHubSearchResponse)); 
    
    beforeEach(inject(function ($q, $rootScope, $controller) {
      scope = $rootScope;
      fakeSearch.query.and.returnValue($q.when( { data: gitHubSearchResponse }));
      fakeCounter.query.and.returnValue($q.when({ data: '20' }));
      ctrl = $controller('GitUserSearchController');
    }));
    
    it("includes user search results in user data", function() {
      ctrl.searchTerm = 'tansaku';
      ctrl.getGithubData();
      scope.$apply();
      expect(ctrl.githubUserData).toEqual(gitHubSearchResponse.items);
    });

    it("includes user repo count in user data", function() {
      mockUserData.items[0].repoCount = '20';
      ctrl.searchTerm = 'tansaku';
      ctrl.getGithubData();
      scope.$apply();
      expect(ctrl.githubUserData).toEqual(mockUserData.items);
    });
  });
});

