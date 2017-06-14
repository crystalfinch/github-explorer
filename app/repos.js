(function() {
  'use strict';
  var app = angular.module('githubExplorer', []);

  angular.module('githubExplorer')
    .controller('ReposCtrl', ['$scope', 'Repos', function($scope, Repos) {
      $scope.username = Repos.getUsername();
      $scope.getRepos = function() {
          Repos.all().then(function(data) {
              $scope.repos = data;
              console.log($scope.repos);
          });
      };
      $scope.update = function() {
        Repos.setUsername($scope.username);
        $scope.getRepos();
      };
    }])
    .factory('Repos', function($http) {
      var _baseUrl = 'https://api.github.com/users/',
          _username = 'crystalfinch',
          _requestUrl = '',
          _data = [];

      var _makeUrl = function() {
        _requestUrl = _baseUrl + _username + '/repos';
        return _requestUrl;
      }

      return {
        setUsername: function(username) {
          _username = username;
        },
        getUsername: function() {
          return _username;
        },
        all: function() {
          _makeUrl();
          var promise = $http({
                method: 'GET',
                url: _requestUrl
              }).then(function(response){
                return response.data;
              }, function(status) {
                console.log(status);
              });
          return promise;
        }
      }
    })
    .directive('repoList', function() {
      return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: '<div> \
            <h3>Found Repositories</h3> \
            <div ng-transclude></div> \
          </div>'
      }
    })
    .directive('repoItem', function() {
      return {
        restrict: 'E',
        require: '^repoList',
        template: '<div> \
          <h2> \
            <a href="{{repo.html_url}}" target="_blank"> \
              {{repo.name}} \
            </a> \
          </h2> \
          <p>Updated {{repo.updated_at | date:"short"}}<br> \
            Created {{repo.created_at | date:"short"}}</p> \
          <div class="ui divider"></div> \
        </div>'
      }
    });
})();
