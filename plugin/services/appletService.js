'use strict';

angular.module('owsWalletPlugin.services').service('appletService', function ($rootScope, $log, CEnvironment) {

  var root = {};
  var SESSION_KEY_DATA = 'data';
  var env = CEnvironment().getInstance();

  // Event '$pre.beforeLeave' is fired after the user clicks to close this applet but before this applet controller
  // is destroyed.  When this event is received we update our session data. Before the applet session is destroyed
  // the session will write it's data to persistent storage. Next time this applet runs the session data will be restored.
  $rootScope.$on('$pre.beforeLeave', function(event, applet, wallet) {
    saveData();
  });

  // Our persistent datastore.
  root.data = {};

  // Set or get applet properties. Applet properties are *not* saved to persistent storage.
  root.getProperty = function(name, value) {
    env.applet.property(name, value);
  };

  root.setProperty = function(obj) {
    env.applet.propertySet(obj);
  };

  // Read applet data from persistent storage via the session object. Here we read from a data key that stores
  // our applet data as saved the last time this applet was run.  If this is the first time this applet has run
  // then the returned data will be empty.
  root.getData = function(cb) {
    env.session.get(SESSION_KEY_DATA).then(function(value) {
      data = value;
      cb(null, data);
    }).catch(function(error) {
      $log.error("Failed to read preferences: " + error.message + ' (' + error.statusCode + ')');
      cb(error);
    });
  };

  // Update the session with applet data and write the session data to persistent storage.
  root.saveData = function() {
    env.session.set(SESSION_KEY_DATA, data);
    env.session.flush();
  };

  // Retrieve our data at startup.
  root.getData();

  return root;
});
