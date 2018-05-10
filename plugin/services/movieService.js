'use strict';

angular.module('owsWalletPlugin.services').service('movieService', function (lodash) {

  var root = {};

  var movies = [{
    id: 'the-avengers',
    title: 'The Avengers',
    year: '2012',
    plot: 'The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri. In exchange for retrieving the Tesseract,2 a powerful energy source of unknown potential, the Other promises Loki an army with which he can subjugate Earth...',
    episode: 'The Avengers',
    likeCount: 267,
    commentCount: 186
  }, {
    id: 'star-wars',
    title: 'Star Wars',
    episode: 'Episode IV - A New Hope',
    year: '1977',
    plot: 'Near the orbit of the desert planet Tatooine, a Rebel spaceship is intercepted by the Empire. Aboard, the deadliest Imperial agent Darth Vader and his stormtroopers capture Princess Leia Organa, a secret member of the rebellion. Before her capture, Leia makes sure the astromech R2-D2, along with the protocol droid C-3PO, escapes with stolen Imperial blueprints stored inside and a holographic message for the retired Jedi Knight Obi-Wan Kenobi, who has been living in exile on Tatooine...',
    likeCount: 582,
    commentCount: 267
  }, {
    id: '2001-space-odyssey',
    title: '2001: A Space Odyssey',
    episode: '2001: A Space Odyssey',
    year: '1968',
    plot: 'In an African desert millions of years ago, a tribe of hominids is driven away from its water hole by a rival tribe. They awaken to find a featureless black monolith has appeared before them. Seemingly influenced by the monolith, they discover how to use a bone as a weapon and drive their rivals away from the water hole...',
    likeCount: 9343,
    commentCount: 2067
  }];

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