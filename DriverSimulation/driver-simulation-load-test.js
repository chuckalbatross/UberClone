const Driver = require('./Driver.js');
const Chance = require('chance');

var chance = new Chance();

// CREATE 20K DRIVERS
var driverArr = [];
var testDriver;

for (var i = 0; i < 20000; i++) {
  testDriver = new Driver(chance.guid(), 
    chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673}),
    chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744}));
  driverArr.push(testDriver);
}

// CALL TRANSMIT LOCATION EVENLY OVER TIME
var setIntervalX = function(callback, delay, repetitions) {
  var x = 0;

  var intervalID = setInterval(() => {
    callback(x);

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay)
}

setIntervalX((x) => {
  driverArr[x].transmitState();
}, 10, 20000);

// GENERATE 20K TRIPS AND GIVE EACH DRIVER ONE
var tripsGenerator = function() {
  
    var trip = {};
    // riderID
  
    // pickup    
    trip.pickup = {};
    // lat
    trip.pickup.lat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
    // long
    trip.pickup.long = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
    // est
    trip.pickup.est = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);

    // dropoff   
    trip.dropoff = {};
    // lat
    trip.dropoff.lat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
    // long
    trip.dropoff.long = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
    // est
    trip.dropoff.est = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);

    return trip;
}

// for (var i = 0; i < 20000; i++) {

//   // CREATE 20K TRIPS
//   var trip = tripsGenerator();
  
//   // ASSIGN DRIVERS TO TRIPS
//   driverArr[i].dropoffRider(trip.pickup, trip.dropoff);
// }
