githubUserSearch.controller('GitUserSearchController', ['Search', 'RepoCounter', function(Search, RepoCounter) {
  var self            = this;
  self.searchTerm     = undefined;
  self.githubUserData = undefined;

  self.getGithubData = function() {
    doSearch(function(data) {
      self.githubUserData = data;
      data.forEach(function(userData) {
        getUserRepoCount(userData.login, function(count) {
          userData.repoCount = count;
        });
      });
    });
  };

  function doSearch(callback) {
    Search.query(self.searchTerm)
      .then(function(response) {
        callback(response.data.items);
      });
  }

  function getUserRepoCount(username, callback) {
    RepoCounter.query(username)
      .then(function(response) {
        callback(response.data);
      });
  }
}]);
