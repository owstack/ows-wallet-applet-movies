'use strict';

angular.module('owsWalletPlugin.controllers').controller('SettingsCtrl', function($scope, Session, externalLinkService, gettextCatalog) {

  var session = Session.getInstance();
  $scope.version = session.plugin.header.version;
  $scope.commitHash = session.plugin.header.commitHash;

  $scope.externalLinks = {
    marketing: {
      itemName: gettextCatalog.getString('Learn More'),
      title: gettextCatalog.getString('Learn More'),
      message: gettextCatalog.getString('Visit the plugin authors website to learn more about this and other plugins.'),
      okText: gettextCatalog.getString('Visit Website'),
      cancelText: gettextCatalog.getString('Go Back'),
      url: session.plugin.header.url.marketing,
      icon: 'ion-ios-information-outline'
    },
    support: {
      itemName: gettextCatalog.getString('Get Support'),
      title: gettextCatalog.getString('Get Support'),
      message: gettextCatalog.getString('You can get support for this plugin from ') + session.plugin.header.author,
      okText: gettextCatalog.getString('Visit Website'),
      cancelText: gettextCatalog.getString('Go Back'),
      url: session.plugin.header.url.support,
      icon: 'ion-ios-help-outline'
    },
    privacy: {
      itemName: gettextCatalog.getString('Privacy Policy'),
      title: gettextCatalog.getString('View Privacy Policy'),
      message: gettextCatalog.getString('Read the privacy policy for this plugin.'),
      okText: gettextCatalog.getString('Visit Website'),
      cancelText: gettextCatalog.getString('Go Back'),
      url: session.plugin.header.url.privacy,
      icon: null
    },
    terms: {
      itemName: gettextCatalog.getString('Terms of Use'),
      title: gettextCatalog.getString('View Terms of Use'),
      message: gettextCatalog.getString('Read the terms of use for this plugin.'),
      okText: gettextCatalog.getString('Visit Website'),
      cancelText: gettextCatalog.getString('Go Back'),
      url: session.plugin.header.url.terms,
      icon: null
    }
  };

  $scope.git = {
    itemName: gettextCatalog.getString('Commit Hash'),
    title: gettextCatalog.getString('View GitHub Project'),
    message: gettextCatalog.getString('You can see the latest developments and contribute to this open source app by visiting our project on GitHub.'),
    okText: gettextCatalog.getString('Open GitHub'),
    cancelText: gettextCatalog.getString('Go Back'),
    url: session.plugin.header.url.git + 'tree/' + $scope.commitHash,
    icon: 'ion-social-github-outline'
  };

  $scope.links = Object.keys($scope.externalLinks);

  $scope.get = function(link) {
    return $scope.externalLinks[link];
  };

  $scope.openExternalLink = function(link) {
    var optIn = true;
    externalLinkService.open(link.url, optIn, link.title, link.message, link.okText, link.cancelText);
  };

});
