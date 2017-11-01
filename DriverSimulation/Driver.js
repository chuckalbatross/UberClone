const Chance = require('chance');
var chance = new Chance();


var Driver = function(guid, lat, long) {
  this.guid = guid;
  this.currPos = {
    lat: lat,
    long: long
  }
}

var setIntervalX = function(callback, delay, repetitions) {
  var x = 0;

  var intervalID = setInterval( () => {
    callback();

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay);

}

Driver.prototype.transmitLocation = function() {
  // console.log(`Driver ${this.guid} - Lat: ${this.currPos.lat}, Long: ${this.currPos.long}`);
  setInterval(() => {
    console.log(`Driver ${this.guid} - Lat: ${this.currPos.lat}, Long: ${this.currPos.long}`);
  }, 1000)
}

Driver.prototype.dropoffRider = function(pickupObj, dropoffObj) {
  
  var pickupEstMs = pickupObj.est * 60 * 1000; // INTRODUCE CHANCE BY MULTIPLYING EST

  // determine lat/long movement per ms
  var deltaLat = (pickupObj.lat - this.currPos.lat) / pickupEstMs;
  var deltaLong = (pickupObj.long - this.currPos.long) / pickupEstMs;

  // update every 5 seconds (1 min / 5 seconds)
  var repetitions = pickupObj.est * 60 / 5;

  // every 5 seconds (repeated repetition times), update driver's lat/long 5 seconds worth of movement 
  setIntervalX( () => {
    this.currPos.lat += (deltaLat * 5000);
    this.currPos.long += (deltaLong * 5000);
  }, 5000, repetitions);

}


////////////////////////////////////////////////////////////////
// TESTING
////////////////////////////////////////////////////////////////

var testDriver = new Driver('b55e0217-d995-5e27-a19a-a007773b9092', 37.5875953, -122.4277966);

// setInterval(function () {
//   testDriver.transmitLocation()
// }, 2500);

testDriver.transmitLocation();

var pickupObj = {
  lat: 37.5906004,
  long: -122.4402796,
  est: 1
}
var dropoffObj = {
  lat: 37.5660525,
  long: -122.4216035,
  est: 5
}
testDriver.dropoffRider(pickupObj, dropoffObj);














