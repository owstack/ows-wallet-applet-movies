'use strict';

angular.module('owsWalletPlugin').config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/home');

	$stateProvider
    .state('home', {
      url: '/home',
	    controller: 'HomeCtrl',
	    templateUrl: 'views/home/home.html'
    })
    .state('page1', {
      url: '/page1',
	    templateUrl: 'views/page1/page1.html'
    })
    .state('page2', {
      url: '/page2',
	    templateUrl: 'views/page2/page2.html'
    })
    .state('page3', {
      url: '/page3',
	    templateUrl: 'views/page3/page3.html'
    });

})
.run(function($rootScope, $ionicPlatform, $state) {

  // Listen for the client service to become ready.
  $rootScope.$on('$pre.ready', function(event) {

    // Load the home view.
    $state.go('home');
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    console.log('Route change start from:', fromState.name || '-', ' to:', toState.name);
  });

});
