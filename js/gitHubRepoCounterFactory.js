githubUserSearch.factory('RepoCounter', ['$http', function($http) {
  function generateQueryUrlFromUsername(username) {
    return "https://api.github.com/users/" + username + "/repos";
  }

  function appendTransform(defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    return defaults.concat(transform);
  }

  function countRepos(data) {
    return "" + data.length
  }

  return {
    query: function(username) {
      return $http({
        url: generateQueryUrlFromUsername(username),
        method: 'GET',
        transformResponse: appendTransform($http.defaults.transformResponse, countRepos)
      });
    }
  }
}]);
          

