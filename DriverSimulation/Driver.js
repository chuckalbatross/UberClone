const Chance = require('chance');
var chance = new Chance();

// ES6 CLASSES (prototype OO vs class OO)
// var Driver = class {
//   constructor(guid, lat, long) {
//     this.guid = guid;
//     this.lat = lat;
//     this.long = long;
//   }
// }


var Driver = function(guid, lat, long) {
  this.guid = guid;
  this.currPos = {
    lat: lat,
    long: long
  }
}

// Option 1: encase this in setInterval (minimalist daemon framework?)
// OR
// Option 2: include setInterval within function (better because this should be independent to each driver)
Driver.prototype.transmitLocation = function() {

  
  console.log(`Driver ${this.guid} - Lat: ${this.currPos.lat}, Long: ${this.currPos.long}`);
}
// Phase 2: set up SQS and have drivers post to it (after driverLocation service, so driverLocation can consume it)
// start with http?

Driver.prototype.dropoffDriver = function(pickupObj, dropoffObj) {
  //** pickupObj.lat
  //** pickupObj.long
  //** pickupObj.est

  //** dropoffObj.lat
  //** dropoffObj.long
  //** dropoffObj.est

  /*
  CURR_POSITION => PICKUP_POSITION

  INTRODUCE CHANCE BY MULTIPLYING EST

    pickupEst to ms (multiply by 60,000)
    deltaLat = (pickupLat - currLat) / 5000
    deltaLong = (pickupLong - currLong) / 5000


    while (currPos !== pickupPos) {
      setInterval(5 seconds) {
         currLat += deltaLat
         currLong += deltaLong
      }
    }

  PICKUP_POS => DROPOFF_POS
*/
}


var testDriver = new Driver('ABC', 123, 54);
// console.log(testDriver);
testDriver.transmitLocation()

console.log(0.0000023 / 10000)