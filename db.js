const mysql = require('mysql');
require('dotenv').config()


var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "movieswipe"
});

con.connect(function(err){
	if(err) throw err;
	console.log("Connected to remote DB!");
});

module.exports = con;