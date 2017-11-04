// const db = require('./index.js');
const Chance = require('chance');
const moment = require('moment');
const csv = require('fast-csv');
const fs = require('fs');

// CREATE SAMPLE TRIP AND WRITE TO DB
var chance = new Chance();


// CREATE 20K DRIVER GUIDs
var driverGuidArr = [];
for (var i = 0; i < 20000; i++) {
  driverGuidArr.push(chance.guid());
}

  
// CREATE 100K RIDER GUIDs
var riderGuidArr = [];
for (var i = 0; i < 100000; i++) {
  riderGuidArr.push(chance.guid());
}


var count = 1;

var historicalDataGenerator = function(level) {

    // BASE CASE:
    if (level >= 20) {
      return;
    }

    var tripsArr = [];

    
    // refactor this into function (generateRandomTrip)
    // for (....)
      // genearteRandomTrip()
    for (var i = 0; i < 500000; i++) {
      var trip = {};
    
      trip.id = count;
    
      trip.driverGuid = chance.pickone(driverGuidArr);
      trip.riderGuid = chance.pickone(riderGuidArr);
    
      trip.category = chance.weighted(['x','select','black','xl'], [80, 9, 4, 7]);
    
      trip.pickupLat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
      trip.pickupLong = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
      trip.pickupEst = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);
    
      trip.dropoffLat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
      trip.dropoffLong = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
      trip.dropoffEst = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);
    
      var acceptedSeed = chance.integer({min: 1504308116000, max: 1509405731000})
      trip.acceptedTimestamp = moment(acceptedSeed).format('YYYY-MM-DD HH:mm:ss');
      var arrivingSeed = acceptedSeed + chance.integer({min: (0.8 * trip.pickupEst * 60000), max: (1.6 * trip.pickupEst * 60000)})
      trip.arrivingTimestamp = moment(arrivingSeed).format('YYYY-MM-DD HH:mm:ss');
      var pickupSeed = arrivingSeed + chance.integer({min: 0, max: 240000})
      trip.pickupTimestamp = moment(pickupSeed).format('YYYY-MM-DD HH:mm:ss');
      var dropoffSeed = pickupSeed + chance.integer({min: (0.8 * trip.dropoffEst * 60000), max: (1.6 * trip.dropoffEst * 60000)})
      trip.dropoffTimestamp = moment(dropoffSeed).format('YYYY-MM-DD HH:mm:ss');
    
      trip.surgeMultiplier = chance.weighted([1.0, chance.floating({min: 1, max: 2, fixed: 1}), chance.floating({min: 2.1, max: 3, fixed: 1})], [0.7, 0.2, 0.1]);
    
      tripsArr.push(trip);
      count++;
    }

    console.log('Level: ', level);
    
    csv.writeToStream(fs.createWriteStream('trips.csv', {flags: 'a'})
    ,tripsArr)
    .on('finish', function() {
      console.log('DONE!');
      level++;
      historicalDataGenerator(level)
    });
}


historicalDataGenerator(0);

// var tripsArr = [];
    
    // for (var i = 0; i < 10000000; i++) {
    //   var trip = {};
    
    //   trip.id = i + 1;
    
    //   trip.driverGuid = chance.pickone(driverGuidArr);
    //   trip.riderGuid = chance.pickone(riderGuidArr);
    
    //   trip.category = chance.weighted(['x','select','black','xl'], [80, 9, 4, 7]);
    
    //   trip.pickupLat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
    //   trip.pickupLong = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
    //   trip.pickupEst = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);
    
    //   trip.dropoffLat = chance.latitude({fixed: 7, min: 37.5596670, max: 37.5926673});
    //   trip.dropoffLong = chance.longitude({fixed: 7, min: -122.4779892, max: -122.4144744});
    //   trip.dropoffEst = chance.weighted([chance.integer({min: 1, max: 6}), chance.integer({min: 7, max: 11}), chance.integer({min: 12, max: 17})], [0.85, 0.12, 0.3]);
    
    //   var acceptedSeed = chance.integer({min: 1504308116000, max: 1509405731000})
    //   trip.acceptedTimestamp = moment(acceptedSeed).format('YYYY-MM-DD HH:mm:ss');
    //   var arrivingSeed = acceptedSeed + chance.integer({min: (0.8 * trip.pickupEst * 60000), max: (1.6 * trip.pickupEst * 60000)})
    //   trip.arrivingTimestamp = moment(arrivingSeed).format('YYYY-MM-DD HH:mm:ss');
    //   var pickupSeed = arrivingSeed + chance.integer({min: 0, max: 240000})
    //   trip.pickupTimestamp = moment(pickupSeed).format('YYYY-MM-DD HH:mm:ss');
    //   var dropoffSeed = pickupSeed + chance.integer({min: (0.8 * trip.dropoffEst * 60000), max: (1.6 * trip.dropoffEst * 60000)})
    //   trip.dropoffTimestamp = moment(dropoffSeed).format('YYYY-MM-DD HH:mm:ss');
    
    //   trip.surgeMultiplier = chance.weighted([1.0, chance.floating({min: 1, max: 2, fixed: 1}), chance.floating({min: 2.1, max: 3, fixed: 1})], [0.7, 0.2, 0.1]);
    
    //   tripsArr.push(trip);
    // }
    
    // csv.writeToStream(fs.createWriteStream('trips.csv', {flags: 'a'})
    // ,tripsArr)
    // .on('finish', function() {
    //   console.log('DONE!');
// });


// csv.writeToPath('trips.csv', tripsArr)
//   .on('finish', function() {
//     console.log('DONE!');
//   });



