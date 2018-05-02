'use strict';

angular.module('owsWalletPlugin.controllers').controller('HomeCtrl', function($scope, $ionicSlideBoxDelegate) {

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.slideIndex = 0;
  });

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

});
