'use strict';

angular.module('owsWalletPlugin.services').service('movieService', function ($rootScope, lodash,
  /* @namespace owsWalletPluginClient.api */ Session) {

  var root = {};

  var SESSION_KEY_DATA = 'data';
  var session;

  var movies = [{
    id: 'the-avengers',
    title: 'The Avengers',
    year: '2012',
    plot: 'The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri. In exchange for retrieving the Tesseract,2 a powerful energy source of unknown potential, the Other promises Loki an army with which he can subjugate Earth...',
    episode: 'The Avengers',
    likeCount: 267,
    commentCount: 186,
    price: {
      amount: 5,
      currency: 'USD'      
    }
  }, {
    id: 'star-wars',
    title: 'Star Wars',
    episode: 'Episode IV - A New Hope',
    year: '1977',
    plot: 'Near the orbit of the desert planet Tatooine, a Rebel spaceship is intercepted by the Empire. Aboard, the deadliest Imperial agent Darth Vader and his stormtroopers capture Princess Leia Organa, a secret member of the rebellion. Before her capture, Leia makes sure the astromech R2-D2, along with the protocol droid C-3PO, escapes with stolen Imperial blueprints stored inside and a holographic message for the retired Jedi Knight Obi-Wan Kenobi, who has been living in exile on Tatooine...',
    likeCount: 582,
    commentCount: 267,
    price: {
      amount: 4,
      currency: 'USD'
    }
  }, {
    id: '2001-space-odyssey',
    title: '2001: A Space Odyssey',
    episode: '2001: A Space Odyssey',
    year: '1968',
    plot: 'In an African desert millions of years ago, a tribe of hominids is driven away from its water hole by a rival tribe. They awaken to find a featureless black monolith has appeared before them. Seemingly influenced by the monolith, they discover how to use a bone as a weapon and drive their rivals away from the water hole...',
    likeCount: 9343,
    commentCount: 2067,
    price: {
      amount: 3,
      currency: 'USD'
    }
  }];

  // Event '$pre.beforeLeave' is fired after the user clicks to close this plugin but before this plugin controller
  // is destroyed.  When this event is received we update our session data. Before the plugin session is destroyed
  // the session will write it's data to persistent storage. Next time this plugin runs the session data will be restored.
  $rootScope.$on('$pre.beforeLeave', function(event, applet) {
    root.saveData();
  });

  // Our persistent datastore.
  root.data = {};

  // Initialize our environment.
  root.init = function(cb) {
    // Set some properties.
    session = Session.getInstance();
    root.appletName = session.plugin.header.name;

    cb();
  };

  // Read plugin data from persistent storage via the session object. Here we read from a data key that stores
  // our plugin data as saved the last time this plugin was run.  If this is the first time this plugin has run
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

  // Update the session with plugin data and write the session data to persistent storage.
  root.saveData = function() {
    session.set(SESSION_KEY_DATA, data);
    session.flush();
  };

  root.getMovies = function() {
    return movies;
  };

  root.getMovie = function(id) {
    return lodash.find(movies, function(movie) {
      return id == movie.id;
    });
  };

  return root;
});
