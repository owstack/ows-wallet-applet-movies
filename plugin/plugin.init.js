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
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsCtrl',
      templateUrl: 'views/settings/settings.html'
    })
    .state('sessionLog', {
      url: '/session-log',
      controller: 'SessionLogCtrl',
      templateUrl: 'views/settings/session-log/session-log.html'
    });

})
.run(function($rootScope, $state, $log, movieService) {

  owswallet.Plugin.ready(function() {

    movieService.init(function() {
      $state.go('home');
    });

  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $log.debug('Applet route change start from:', fromState.name || '-', ' to:', toState.name);
  });

});
