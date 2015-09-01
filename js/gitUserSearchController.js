githubUserSearch.controller('GitUserSearchController', ['Search', 'RepoCounter', function(Search, RepoCounter) {
  var self            = this;
  self.searchTerm     = undefined;
  self.githubUserData = undefined;

  self.getGithubData = function() {
    self.doSearch(function(data) {
      self.githubUserData = data;
      data.forEach(function(userData) {
        self.getUserRepoCount(userData.login, function(count) {
          userData.repoCount = count;
        });
      });
    });
  };

  self.doSearch = function(callback) {
    Search.query(self.searchTerm)
      .then(function(response) {
        callback(response.data.items);
      });
  }

  self.getUserRepoCount = function(username, callback) {
    RepoCounter.query(username)
      .then(function(count) {
        callback(count.data);
      });
  }
}]);
