const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
require('dotenv').config()
const db = require("./db");

var movies = require('./routes/movies.js')
var user = require('./routes/user.js')

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.send("Hello world!");
})

app.use('/api/movies', movies);
app.use('/api/user', user);

app.listen(port, ()=>{
	console.log(`Listening on ${port}`);
})
