const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
require('dotenv').config()
const db = require("./db");
const cors = require('cors');

var moviesRoute = require('./routes/movies.js')
var userRoute = require('./routes/user.js')
var groupRoute = require('./routes/group.js')
var pollRoute = require('./routes/poll.js')

const port = process.env.PORT;
const sessionSecret = process.env.SESSIONSECRET;

app.use(express.json());
app.use(bodyParser.json());
app.use(session({
	secret: sessionSecret,
	resave: true,
	saveUninitialized: true,
  cookie: { sameSite: 'strict' },
}));

var whitelist = ['http://localhost:19006', undefined, "http://localhost:5000"]
var corsOptions = {
  origin: function (origin, callback) {
    console.log("Request from:", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

if(process.env.NODE_ENV !== "production"){
	app.use(cors(corsOptions));
}


app.use(express.static(path.join(__dirname, 'client/web-build')));

app.use('/api/movies/v1/', moviesRoute);
app.use('/api/user/v1/', userRoute);
app.use('/api/group/v1/', groupRoute);
app.use('/api/poll/v1/', pollRoute);

app.listen(port, ()=>{
	console.log(`Listening on ${port}`);
})
