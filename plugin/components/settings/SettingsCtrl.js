'use strict';

angular.module('owsWalletPlugin.controllers').controller('SettingsCtrl', function($scope, Session, externalLinkService) {

  var session = Session.getInstance();
  $scope.version = session.plugin.header.version;
  $scope.terms = session.plugin.header.url.terms;

  $scope.openExternalLink = function(which) {
    var optIn = true;
    externalLinkService.open(
    	$scope.externalLinks[which].url,
    	optIn,
    	$scope.externalLinks[which].title,
    	$scope.externalLinks[which].message,
    	$scope.externalLinks[which].okText,
    	$scope.externalLinks[which].cancelText);
  };

});
