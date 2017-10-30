const mysql = require('mysql');
const Sequelize = require('sequelize');
  
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "trip".

const connection = mysql.createConnection({
  user: 'root',
  password: ''
});

connection.connect(err => {
  if (err) {
    console.log(`Error! Connection to bookingsDB unsuccessful: ${err}`);
  } else {
    console.log(`Success! Connection to bookingsDB established`);
  }
})

const sequelize = new Sequelize('bookings', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Success! Sequelize connection established');
  })
  .catch(err => {
    console.log(`Error! Sequelize unable to connect to database: ${err}`);
  });