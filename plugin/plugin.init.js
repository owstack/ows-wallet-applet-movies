'use strict';

angular.module('owsWalletPlugin').config(function($stateProvider) {

	$stateProvider
    .state('home', {
      url: '/home',
	    controller: 'HomeCtrl',
	    templateUrl: 'views/home/home.html'
    })
    .state('detail', {
      url: '/detail/:id',
      controller: 'DetailCtrl',
	    templateUrl: 'views/detail/detail.html'
    });

})
.run(function($rootScope, $state, pLog, starterService) {

  owswallet.Plugin.ready(function() {

    starterService.init(function() {
      $state.go('home');
    });

  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    pLog.debug('Applet route change start from:', fromState.name || '-', ' to:', toState.name);
  });

});
