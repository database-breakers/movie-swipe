const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config()

const port = process.env.PORT;

var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

con.connect(function(err){
	if(err) throw err;
	console.log("Connected!");
});

app.get('/', (req,res) => {
	res.send("Hello world!");
})

app.listen(port, ()=>{
	console.log(`Listening on ${port}`);
})
