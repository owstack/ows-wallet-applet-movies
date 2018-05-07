'use strict';

angular.module('owsWalletPlugin.controllers').controller('HomeCtrl', function($scope, starterService, movieService) {

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.appletName = starterService.appletName;
	  $scope.movies = movieService.getMovies();
  });

});
