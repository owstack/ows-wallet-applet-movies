'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($scope, movieService) {

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
	  $scope.movie = movieService.getMovie(data.stateParams.id);
  });

});
