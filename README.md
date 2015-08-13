Smart Places JS
===============================
This is related with my master thesis.
Allow your web application to get when the Smart Places Mobile app got tags around you from nearby BLE beacons.

# Installation
You have two ways of getting this library

## Manually
* Get ```dist/smartplaces.js``` file and include it in your web application

## With bower
```
bower install smartplaces-js --save
```

# Usage:

First you you will need some ibeacons and register them in the backend.
Then, you will also need to register your Smart Place and the url for the owners and for users. Still, there is no easy way of getting this done. There is no application. We need to put the data manually in the backend.

## In owner's apps
You can use this library to create the app that owners use to tag the different objects in a given smart place.
The mobile app will call a function to initialize the library.

In your code you must define a callback function for when this initialization happens:

```javascript
SmartPlaces.onInit(function(smartPlaceInstance) {
  console.log(smartPlaceInstance);
});
```

The owners can try to scan for nearby beacons. You need to define a callback for when beacons are scanned.

```javascript
SmartPlaces.onBeaconsScanned(function(beacons) {
  console.log(beacons);
});
```
beacons argument is an array where each object has the following structure:

```json
{
  "uuid": "<UUID of the beacon",
  "major": "<major>",
  "minor": "<minor>"
}
```

After got these objects, you can use each of them to get more info from the backend, such as the name and the icon (that you can use to show in your owner's app to give some visual guidance)

```javascript
SmartPlaces.getBeacon(beacons[0], {
  success: function(beacon) {
    console.log(beacon);
  },
  error: function(error) {
    console.log(error);
  }
});
```

The ```beacon``` object in success callback has the following methods:

```javascript
var uuid = beacon.uuid();
var major = beacon.major();
var minor = beacon.minor();
var name = beacon.name();

// Icon is an url that you can use in an img tag
var icon = beacon.icon();
```

Using this beacon object got from ```getBeacon``` method, you can associate a tag to it. To do so you can use ```associateTag``` method:

```javascript
SmartPlaces.associateTag(beacon, tagData, {
  success: function(tag) {
    console.log(tag);
  },
  error: function(error) {
    console.log(error);
  }
});
```

```tagData``` is a json object with any data you want.
```tag``` argument of ```success``` callback is an object with the following methods:

```javascript
var data = tag.data();
var beacon = tag.beacon();
```

As you can see, you can change data of an existing tag. If you want to save those changes in the backend use the ```updateTag``` method:

```javascript
SmartPlaces.updateTag(tag, newData, {
  success: function(updatedTag) {
    console.log(updatedTag);
  },
  error: function(error) {
    console.log(error);
  }
});
```

If you want to allow owners to get the tags that the user has already defined you can use the ```getTags``` method:

```javascript
SmartPlaces.getTags({
  success: function(tags) {
    console.log(tags);
  },
  error: function(error) {
    console.log(error);
  }
});
```

You can also delete existing tags.

```javascript
SmartPlaces.deleteTag(tag, {
  success: function() {
    console.log('Tag has been deleted');
  },
  error: function(error) {
    console.log(error);
  }
});
```

## In client's apps
* In your JS code define a callback for when a tag has been found.

```javascript
SmartPlaces.onTagFound(function(tag) {
  console.log(tag)
});
```

Now, you can use the tag object to do whatever you want.

You can check two examples of apps using this library:
* [Restaurant app](https://github.com/samfcmc/SLOC-API-and-RestApp)
* [Smart Museum](https://github.com/samfcmc/smart-museum)

Have fun creating Smart Places and empowering your web applicatons :)
