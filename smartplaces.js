/*
 * Parse classes
 */
var Tag = Parse.Object.extend('Tag');
var SmartPlaceInstance = Parse.Object.extend('SmartPlaceInstance');

window.SmartPlaces = {
  init: function(id) {
    Parse.initialize("TnStNm2KgQHo0YxDKF5MEIkSC4VoNQD1sPfxtv7e",
      "8OmJ4lLF4xWfr8AvIPYJrcBbx6UwxI0bd8D9uYGT");
    this.instanceId = id;
  },
  hello: function() {
    alert("hello, just testing");
  },
  tagFound: function() {
    throw "You need to define a callback for when a tag is found. " +
      "Call SmartPlaces.onTagFound(callback)";
  },
  beaconsScanned: function() {
    throw "You need to define a callback for when beacons are scanned";
  },
  onTagFound: function(callback) {
    // The mobile app will call tagFound callback
    this.tagFound = callback;
  },
  onBeaconsScanned: function(callback) {
    this.beaconsScanned = callback;
  },
  getTags: function(success, error) {
    var query = new Parse.Query(Tag);
    var instance = new SmartPlaceInstance();
    instance.id = this.instanceId;
    query = query.equalTo('smartPlaceInstance', instance);
    query.find({
      success: success,
      error: error
    });
  }
};
