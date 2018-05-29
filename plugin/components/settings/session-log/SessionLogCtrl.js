'use strict';

angular.module('owsWalletPlugin.controllers').controller('SessionLogCtrl', function($scope, historicLogService, lodash, gettextCatalog, Session) {

  var session = Session.getInstance();
  var pluginId = session.plugin.header.id + '@' + session.plugin.header.version;
  $scope.pluginName = session.plugin.header.name + '@' + session.plugin.header.version;
  $scope.isCordova = owswallet.Plugin.isCordova();

  var logLevel = session.logLevel;
  var logLevels = historicLogService.getLevels();

  $scope.$on("$ionicView.enter", function(event, data) {
    var selectedLevel = historicLogService.getLevel(logLevel);
    filterLogs(selectedLevel.weight);
  });

  $scope.prepareLogs = function() {
    var log = pluginId + ' session logs\n Be careful, this could contain sensitive private data.\n\n';
    log += '\n\n';
    log += historicLogService.get().map(function(v) {
      return '[' + v.timestamp + '][' + v.level + ']' + v.msg;
    }).join('\n');

    return log;
  };

  $scope.sendLogs = function() {
    var body = $scope.prepareLogs();

    window.plugins.socialsharing.shareViaEmail(
      body,
      pluginId + ' session logs',
      null, // TO: must be null or an array
      null, // CC: must be null or an array
      null, // BCC: must be null or an array
      null, // FILES: can be null, a string, or an array
      function() {},
      function() {}
    );
  };

  var filterLogs = function(weight) {
    $scope.filteredLogs = historicLogService.get(weight);
  };

});
