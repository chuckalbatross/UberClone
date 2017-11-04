const Driver = require('./Driver.js');
const Chance = require('chance');

var chance = new Chance();


////////////////////////////////////////////////////////////////
// TESTING
////////////////////////////////////////////////////////////////

//now instantiate 20k drivers

// var testDriver = new Driver('b55e0217-d995-5e27-a19a-a007773b9092', 37.5875953, -122.4277966);

// CREATE 20K DRIVERS
var driverArr = [];
var testDriver;

for (var i = 0; i < 20000; i++) {
  testDriver = new Driver(chance.guid(), 
    chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673}),
    chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744}));
  driverArr.push(testDriver);
}

// NOT REALISTIC: all transmitting state at same small period
// driverArr.forEach(driver => {
//   // console.log(driver);
//   driver.transmitState();
// });


// transmitStateArr = [];
// var randNum;
// HAHAHA really fast at beginning (because any random number will do because none are taken), then gets slower and slower for last couple
// while (transmitStateArr.length < 20000) {
//   // generate a random number between [0, 20000)
//   randNum = Math.floor(Math.random() * 20000);
//   // if transmitStateArr doesn't contain randNum
//   if (!transmitStateArr.includes(randNum)) {
//     // call transmit state that driver at randNum index
//     driverArr[randNum].transmitState();
//     // push randNum into transmitStateArr
//     transmitStateArr.push(randNum);
//   }
// }


// DOESN'T WORK: memory overflow
// var index = 0;
// while (index < 10) {
//   setTimeout(() => {
//     driverArr[index++].transmitState();
//   }, 10)
// }

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
  

for (var i = 0; i < 20000; i++) {

  // CREATE 20K TRIPS
  var trip = tripsGenerator();
  
  // ASSIGN DRIVERS TO TRIPS
  driverArr[i].dropoffRider(trip.pickup, trip.dropoff);

}


// testDriver.transmitState();

// // also needs tripID
// var pickupObj = {
//   lat: 37.5906004,
//   long: -122.4402796,
//   est: 1
// }
// var dropoffObj = {
//   lat: 37.5660525,
//   long: -122.4216035,
//   est: 5
// }

// testDriver.dropoffRider(pickupObj, dropoffObj);




