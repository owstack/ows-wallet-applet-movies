'use strict';

angular.module('owsWalletPlugin.controllers').controller('HomeCtrl', function($scope, movieService) {

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.appletName = movieService.appletName;
	  $scope.movies = movieService.getMovies();
  });

});
