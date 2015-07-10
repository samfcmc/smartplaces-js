Smart Places JS
===============================
Allow your web application to get when the Smart Places Mobile app got objects around you from nearby BLE beacons.

# Installation

## Manually
* Get ```smartplaces.js``` file and include it in your web application

## With bower
```
bower install smartplaces-js --save
```

# Usage:
* In your JS code define a callback for when an object has been found.

```javascript

SmartPlaces.onObjectFound(function(object) {
  // Whatever you want to do with object
});

```

That's it, when the Smart Places mobile app gets nearby objects your callback will be called
