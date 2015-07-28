(function(module) {
  module.exports = function(Parse) {
    /*
     * Parse classes
     */
    var Tag = Parse.Object.extend('Tag', {
      data: function() {
        return this.get('data');
      },
      beacon: function() {
        return this.get('beacon');
      },
      setData: function(data) {
        this.set('data', data);
      },
      setBeacon: function(beacon) {
        this.set('beacon', beacon);
      }
    });

    var SmartPlaceInstance = Parse.Object.extend('SmartPlaceInstance');
    var Beacon = Parse.Object.extend('Beacon', {
      uuid: function() {
        return this.get('uuid');
      },
      major: function() {
        return this.get('major');
      },
      minor: function() {
        return this.get('minor');
      }
    });

    return {
      smartPlaceInstance: {},
      init: function(id) {
        Parse.initialize("TnStNm2KgQHo0YxDKF5MEIkSC4VoNQD1sPfxtv7e",
          "8OmJ4lLF4xWfr8AvIPYJrcBbx6UwxI0bd8D9uYGT");
        var query = new Parse.Query(SmartPlaceInstance);
        var self = this;
        query.get(id, {
          success: function(smartPlaceInstance) {
            self.smartPlaceInstance = smartPlaceInstance;
            self.didInit(smartPlaceInstance);
          },
          error: function(error) {
            alert('Cannot initialize SmartPlaces ' + error);
          }
        });
      },
      didInit: function() {
        throw 'You need to define a callback for initialization. Call SmartPlaces.onInit(callback)';
      },
      onInit: function(callback) {
        this.didInit = callback;
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
      getTags: function(options) {
        var query = new Parse.Query(Tag);
        var instance = this.smartPlaceInstance;
        query = query.equalTo('smartPlaceInstance', instance);
        query = query.include('beacon');
        query.find(options);
      },
      getBeacon: function(beaconInfo, options) {
        var query = new Parse.Query(Beacon);
        query = query.equalTo('uuid', beaconInfo.uuid);
        query = query.equalTo('major', beaconInfo.major);
        query = query.equalTo('minor', beaconInfo.minor);
        query.first(options);
      },
      associateTag: function(beacon, tagData, options) {
        var tag = new Tag();
        var instance = this.smartPlaceInstance;
        tag.save({
          beacon: beacon,
          data: tagData,
          smartPlaceInstance: instance
        }, options);
      },
      updateTag: function(tag, data, options) {
        tag.save({
          data: data
        }, options);
      },
      deleteTag: function(tag, options) {
        tag.destroy(options);
      }
    };
  };

}(module));
