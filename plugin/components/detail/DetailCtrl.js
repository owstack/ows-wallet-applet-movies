'use strict';

angular.module('owsWalletPlugin.controllers').controller('DetailCtrl', function($scope, pLog, movieService, BitPay, Session, Transaction, popupService) {

  var bitpay = new BitPay('movieStore');

  owswallet.Plugin.openForBusiness(BitPay.pluginId, function() {
    // The BitPay servlet is ready, user can now buy movies!
    $scope.buyDiabled = false;
  });

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.buyDiabled = true;
    $scope.movie = movieService.getMovie(data.stateParams.id);
  });

  $scope.buy = function(movieId) {
    Session.getInstance().chooseWallet().then(function(wallet) {
      if (!wallet) {
        pLog.info('User canceled');
        return;
      }

      var movie = movieService.getMovie(movieId);
      doBuy(movie, wallet);

    }).catch(function(error) {
      pLog.error('Could not choose a wallet: ' + JSON.stringify(error));
    });
  };

  function doBuy(movie, wallet) {
    var payment = {
      price: movie.price.amount,
      currency: movie.price.currency
    };

    bitpay.sendPayment(wallet, payment, confirmHandler).then(function() {
      pLog.debug('Payment sent');

    }).catch(function(error) {
      pLog.error('Could not create payment request: ' + error.message);

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
