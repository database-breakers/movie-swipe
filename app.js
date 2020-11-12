const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
require('dotenv').config()
const db = require("./db");

var moviesRoute = require('./routes/movies.js')
var userRoute = require('./routes/user.js')
var groupRoute = require('./routes/group.js')

const port = process.env.PORT;
const sessionSecret = process.env.SESSIONSECRET;

app.use(express.json());
app.use(bodyParser.json());
app.use(session({
	secret: sessionSecret,
	resave: true,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/movies/v1/', moviesRoute);
app.use('/api/user/v1/', userRoute);
app.use('/api/group/v1/', groupRoute);

app.listen(port, ()=>{
	console.log(`Listening on ${port}`);
})
