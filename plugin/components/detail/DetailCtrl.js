'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($scope, pLog, movieService, Session) {

  $scope.buyDiabled = true;

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
	  $scope.movie = movieService.getMovie(data.stateParams.id);
  });

  owswallet.Plugin.openForBusiness('org.openwalletstack.wallet.plugin.servlet.bitpay', function() {
    // The BitPay servlet is ready, user can now buy movies!
    $scope.buyDiabled = false;
  });

  $scope.buy = function(id) {
  	Session.getInstance().chooseWallet().then(function(wallet) {
  		if (!wallet) {
	  		pLog.info('User canceled');
        return;
  		}

      movieService.buyMovie(id, wallet);

  	}).catch(function(error) {
  		pLog.error('Could not choose a wallet: ' + JSON.stringify(error));
  	});
  };

});
