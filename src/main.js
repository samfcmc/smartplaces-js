(function(require, window) {
  var Parse = require('../lib/parse-1.5.0');
  window.SmartPlaces = require('./smartplaces')(Parse.Parse);
}(require, window));
