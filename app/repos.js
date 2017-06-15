(function() {
  'use strict';
  var app = angular.module('githubExplorer', []);

  angular.module('githubExplorer')
    .controller('ReposCtrl', ['$scope', 'username', 'repositories', function($scope, username, repositories) {
      $scope.username = username;
      $scope.getRepos = function() {
        repositories.all($scope.username).then(function(data) {
          $scope.repos = data;
        });
      };
    }])
    .value('username', 'airbnb') // initial value
    .factory('githubUrl', [function() {
      return {
        makeUrl: function(username) {
          var url = 'https://api.github.com/users/' + username + '/repos';
          return url;
        }
      };
    }])
    .factory('repositories', ['$http', 'githubUrl', function($http, githubUrl) {
      return {
        all: function(username) {
          var _requestUrl = githubUrl.makeUrl(username);
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
    }])
    .directive('repoList', function() {
      return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: '<div ng-transclude></div>'
      }
    });
})();
