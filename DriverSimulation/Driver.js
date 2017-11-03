const Chance = require('chance');
var chance = new Chance();


var Driver = function(guid, lat, long) {
  this.guid = guid;
  this.currPos = {
    lat: lat,
    long: long
  };
  this.state = 'Available';
}

// CONVERT TO PROMISE?
Driver.prototype.setIntervalX = function(callback, futureState, delay, repetitions) {
  var x = 0;

  var intervalID = setInterval( () => {
    callback();

    if (++x === repetitions) {
      this.state = futureState;
      clearInterval(intervalID);
    }
  }, delay);
}

Driver.prototype.transmitState = function() {
  setInterval(() => {
    // replace this with post to SQS
    console.log(`Driver ${this.guid} - Lat: ${this.currPos.lat}, Long: ${this.currPos.long}, State: ${this.state}`);
  }, 10000)
}

Driver.prototype.dropoffRider = function(pickupObj, dropoffObj) {
  
  this.state = 'pickup';
  // CURRENT LOCATION => PICKUP LOCATION  
  var pickupEstMs = pickupObj.est * 60 * 1000; // INTRODUCE CHANCE BY MULTIPLYING EST
  // determine lat/long movement per ms
  var deltaLat = (pickupObj.lat - this.currPos.lat) / pickupEstMs;
  var deltaLong = (pickupObj.long - this.currPos.long) / pickupEstMs;
  // calculate number of repetitions, so position is updated every 5 seconds
  var repetitions = pickupObj.est * 60 / 5;

  // every 5 seconds (repeated "repetition" times), update driver's lat/long 5 seconds worth of movement 
  this.setIntervalX( () => {
    this.currPos.lat += (deltaLat * 5000);
    this.currPos.long += (deltaLong * 5000);
  }, 'dropoff', 5000, repetitions);

  // PICKUP LOCATION => DROPOFF LOCATION
  var dropoffEstMs = dropoffObj.est * 60 * 1000;
  // determine lat/long movement per ms
  deltaLat = (dropoffObj.lat - this.currPos.lat) / dropoffEstMs;
  deltaLong = (dropoffObj.long - this.currPos.long) / dropoffEstMs;
  // calculate number of repetitions, so position is updated every 5 seconds
  repetitions = dropoffObj.est * 60 / 5;

  this.setIntervalX( () => {
    this.currPos.lat += (deltaLat * 5000);
    this.currPos.long += (deltaLong * 5000);
  }, 'available', 5000, repetitions);

  // send (dropoff timestamp) so tripsDB can update record
  // this.state = 'Available';   // ERROR: all transmitState messages show state as available. This is because you were setting state synchronously, while setInterval is async. So this.state = 'Available' at the end was called before any transmitState was called.
}

module.exports = Driver;














