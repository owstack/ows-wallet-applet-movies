'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($scope, $log, $timeout, movieService, popupService,
  /* @namespace owsWalletPlugin.api.bitpay */ BitPay,
  /* @namespace owsWalletPlugin.api.bitpay */ BitPayServlet,
  /* @namespace owsWalletPluginClient.api */ Session) {

  var bitpay = new BitPay();

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.buyDisabled = true;
    $scope.movie = movieService.getMovie(data.stateParams.id);

    owswallet.Plugin.openForBusiness(BitPayServlet.id, function() {
      // The BitPay servlet is ready, user can now buy movies!
      $scope.buyDisabled = false;
    });
  });

  $scope.buy = function(movieId) {
    Session.getInstance().chooseWallet().then(function(wallet) {
      if (!wallet) {
        $log.info('User canceled');
        return;
      }

      var movie = movieService.getMovie(movieId);
      doBuy(movie, wallet);

    }).catch(function(error) {
      // Error logged

    });
  };

  function doBuy(movie, wallet) {
    var payment = {
      price: movie.price.amount,
      currency: movie.price.currency
    };

    bitpay.sendPayment(wallet, payment, confirmHandler).then(function() {
      $log.debug('Payment sent');

    }).catch(function(error) {
      var title = 'Oops! Our Fault';
      var message = 'We are unable to process your purchase at this time. Please try again later.';
      popupService.showAlert(title, message);

    });

    function confirmHandler() {
      return new Promise(function(resolve, reject) {
        var title = 'Confirm Your Purchase';
        var message = 'You are buying ' + movie.title + ' for ' + movie.price + ' ' + movie.currency + '.';
        var okText = 'Buy';
        var cancelText = 'Cancel';

        popupService.showConfirm(title, message, okText, cancelText, function(ok) {
          if (ok) {
            resolve();
          }
          reject();
        });
      });
    };
  };

});
