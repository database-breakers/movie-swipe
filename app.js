const express = require('express');
const app = express();
require('dotenv').config()
const db = require("./db");

var movies = require('./routes/movies.js')

const port = process.env.PORT;

app.get('/', (req,res) => {
	res.send("Hello world!");
})

app.use('/api/movies', movies);

app.listen(port, ()=>{
	console.log(`Listening on ${port}`);
})
