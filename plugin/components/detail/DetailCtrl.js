'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($rootScope, $scope, apiLog, movieService, CSession) {

  $scope.buyDiabled = true;

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
	  $scope.movie = movieService.getMovie(data.stateParams.id);
  });

  $rootScope.$on('$pre.openForBusiness', function(event, pluginId) {
    // The BitPay servlet is ready, user can now buy movies!
    if (pluginId == 'org.openwalletstack.wallet.plugin.servlet.bitpay') {
      $scope.buyDiabled = false;
    }
  });

  $scope.buy = function(id) {
  	CSession.getInstance().chooseWallet().then(function(wallet) {
  		if (!wallet) {
	  		apiLog.info('User canceled');
        return;
  		}

      movieService.buyMovie(id);

  	}).catch(function(error) {
  		apiLog.error('Could not choose a wallet: ' + JSON.stringify(error));
  	});
  };

});
