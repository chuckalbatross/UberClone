var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "trip".

exports.connection = mysql.createConnection({
  user: 'root',
  password: ''
});

exports.connection.connect(err => {
  if (err) {
    console.log(`Error! Connection to bookingsDB unsuccessful: ${err}`);
  } else {
    console.log(`Success! Connection to bookingsDB established`);
  }
})