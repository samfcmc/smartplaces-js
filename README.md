Smart Places JS
===============================
Allow your web application to get when the Smart Places Mobile app got tags around you from nearby BLE beacons.

# Installation

## Manually
* Get ```smartplaces.js``` file and include it in your web application

## With bower
```
bower install smartplaces-js --save
```

# Usage:
* In your JS code define a callback for when a tag has been found.

```javascript

SmartPlaces.onTagFound(function(tag) {
  // Whatever you want to do with tag
});

```

That's it, when the Smart Places mobile app gets nearby tags your callback will be called
