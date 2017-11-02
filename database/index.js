const mysql = require('mysql');
// const moment = require('moment');
  
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "trip".

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'tripsDB'
});

connection.connect(err => {
  if (err) {
    console.log(`Error! Connection to bookingsDB unsuccessful: ${err}`);
  } else {
    console.log(`Success! Connection to bookingsDB established`);
  }
})

// SEQUELIZE: REFACTOR FOR SPEED PERFORMANCE BENCHMARK VS RAW QUERY

// const db = new Sequelize('bookings', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// db.authenticate()
//   .then(() => {
//     console.log('Success! Sequelize connection established');
//   })
//   .catch(err => {
//     console.log(`Error! Sequelize unable to connect to database: ${err}`);
//   });

// // DEFINE MODELS

// const Trip = db.define('trip', {
//   id: {
//     type: Sequelize.
//   }
//   'driver-uuid': {
//     type: Sequelize.DataTypes.UUID,
//     defaultValue: Sequelize.DataTypes.UUIDV1,
//     allowNull: false
//   }
// })


// module.exports.connection = connection;