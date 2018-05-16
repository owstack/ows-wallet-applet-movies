'use strict';

angular.module('owsWalletPlugin').config(function($urlRouterProvider, $stateProvider) {
//  $urlRouterProvider.otherwise('/home');

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
.run(function($rootScope, $state, starterService, $ionicPlatform) {

  $ionicPlatform.ready(function() {

    // Listen for the client service to become ready, do some initialization and set the home view.
    $rootScope.$on('$pre.ready', function(event, session) {

      starterService.init(session, function() {
        $state.go('home');
      });

    });

  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    console.log('Applet route change start from:', fromState.name || '-', ' to:', toState.name);
  });

});
