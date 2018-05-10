'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($scope, $log, movieService, CSession) {

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
	  $scope.movie = movieService.getMovie(data.stateParams.id);
  });

  $scope.buy = function() {
  	CSession.getInstance().chooseWallet().then(function(wallet) {
  		if (!wallet) {
	  		$log.debug('Use canceled');
  		} else {
	  		$log.debug('Wallet received');
  		}

  	}).catch(function(error) {
  		$log.debug('Error choosing a wallet: ' + JSON.stringify(error));
  	});
  };

});
