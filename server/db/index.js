var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'plantlife',
    database : 'chat'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("BOUT DAT PLANTLIFE!")
});

module.exports = connection;