'use strict';

angular.module('owsWalletPlugin.services').service('starterService', function ($rootScope, $log) {

  var root = {};
  var SESSION_KEY_DATA = 'data';
  var session;

  // Event '$pre.beforeLeave' is fired after the user clicks to close this applet but before this applet controller
  // is destroyed.  When this event is received we update our session data. Before the applet session is destroyed
  // the session will write it's data to persistent storage. Next time this applet runs the session data will be restored.
  $rootScope.$on('$pre.beforeLeave', function(event, applet) {
    saveData();
  });

  // Our persistent datastore.
  root.data = {};

  // Initialize our environment.
  root.init = function(sessionObj, cb) {
    // Hold on to my session object.
    session = sessionObj;

    // Ask my session to retrieve my applet information.
    session.getApplet().then(function(applet) {
      // Set some properties.
      root.appletName = session.applet.header.name;

      cb();
    });
  };

  // Read applet data from persistent storage via the session object. Here we read from a data key that stores
  // our applet data as saved the last time this applet was run.  If this is the first time this applet has run
  // then the returned data will be empty.
  root.getData = function(cb) {
    cb = cb || function(){};
    session.get(SESSION_KEY_DATA).then(function(value) {
      cb(null, value);
    }).catch(function(error) {
      $log.error("Failed to read preferences: " + error.message + ' (' + error.statusCode + ')');
      cb(error);
    });
  };

  // Update the session with applet data and write the session data to persistent storage.
  root.saveData = function() {
    session.set(SESSION_KEY_DATA, data);
    session.flush();
  };

  return root;
});
