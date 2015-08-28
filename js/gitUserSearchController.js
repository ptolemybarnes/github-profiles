githubUserSearch.controller('GitUserSearchController', ['Search', 'GitHubRepoCounter', function(Search, GitHubRepoCounter) {
  var self            = this;
  self.searchTerm     = undefined;
  self.githubUserData = undefined;

  self.getGithubData = function() {
    self.doSearch(function(data) {
      for(var i = 0; i < data.length; i ++) {
        self.getUserRepoCount(data[i].login, function(count) {
          data[i].count = count;
        });
      }
      self.githubUserData = data;
    });
  }

  self.doSearch = function(callback) {
    Search.query(self.searchTerm)
      .then(function(response) {
        callback(response.data);
      });
  }

  self.getUserRepoCount = function(username, callback) {
    GitHubRepoCounter.query(username)
      .then(function(count) {
        callback(count);
      });
  }
}]);
