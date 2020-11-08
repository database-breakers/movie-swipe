const mysql = require('mysql');
require('dotenv').config()


var db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "movieswipe"
});

db.connect(function(err){
	if(err) throw err;
	console.log("Connected to remote DB!");
});

/**
 * Gets writers for a particular movie
 */
async function getWriter(imdb_id){
    return new Promise (data => db.query("SELECT writer FROM Movie_writer WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.writer)
        data(result)
    }))
}

/**
 * 
 * @param {string} imdb_id The ID of the movie.
 */
async function getDirector(imdb_id){
    return new Promise (data => db.query("SELECT director FROM Movie_director WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.director)
        data(result)
    }))
}

async function getGenre(imdb_id){
    return new Promise (data => db.query("SELECT genre FROM Movie_genre WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.genre)
        data(result)
    }))
}

async function getActor(imdb_id){
    return new Promise (data => db.query("SELECT actor FROM Movie_actor WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.actor)
        data(result)
    }))
}

async function getMovie(imdb_id){
    return new Promise (data => db.query("SELECT * FROM Movie WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        data(result)
    }))
}

async function getGenreList(){
    return new Promise (data => db.query("SELECT distinct genre FROM Movie_genre", function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.genre);
        data(result)
    }))
}

module.exports = {
    getActor,
    getDirector,
    getGenre,
    getGenreList,
    getMovie,
    getWriter
};