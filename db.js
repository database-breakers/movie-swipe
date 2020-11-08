const mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config()

var saltRounds = 10;

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
    return new Promise (data => 
        db.query("SELECT writer FROM Movie_writer WHERE imdb_id = ?", imdb_id, function (err, result, fields){
            if (err) throw err;
            result = result.map(r => r.writer)
            data(result)
        })
    )
}

/**
 * 
 * @param {string} imdb_id The ID of the movie.
 */
async function getDirector(imdb_id){
    return new Promise (data => 
        db.query("SELECT director FROM Movie_director WHERE imdb_id = ?", imdb_id, function (err, result, fields){
            if (err) throw err;
            result = result.map(r => r.director)
            data(result)
        })
    )
}

/**
 * 
 * @param {string} imdb_id 
 */
async function getGenre(imdb_id){
    return new Promise (data => 
        db.query("SELECT genre FROM Movie_genre WHERE imdb_id = ?", imdb_id, function (err, result, fields){
            if (err) throw err;
            result = result.map(r => r.genre)
            data(result)
        })
    )
}

/**
 * 
 * @param {string} imdb_id 
 */
async function getActor(imdb_id){
    return new Promise (data => 
        db.query("SELECT actor FROM Movie_actor WHERE imdb_id = ?", imdb_id, function (err, result, fields){
            if (err) throw err;
            result = result.map(r => r.actor)
            data(result)
        })
    )
}

/**
 * 
 * @param {string} imdb_id 
 */
async function getMovie(imdb_id){
    return new Promise (data => 
        db.query("SELECT * FROM Movie WHERE imdb_id = ?", imdb_id, function (err, result, fields){
            if (err) throw err;
            data(result[0])
        })
    )
}

/**
 * 
 */
async function getGenreList(){
    return new Promise (data => 
        db.query("SELECT distinct genre FROM Movie_genre", function (err, result, fields){
            if (err) throw err;
            result = result.map(r => r.genre);
            data(result)
        })
    )
}

/**
 * 
 * @param {*} username 
 * @param {*} password 
 */
async function createUser(username, password){
    return new Promise (data => 
        bcrypt.hash(password, saltRounds, (err, hash) => {
            db.query("INSERT INTO User VALUES (?, ?, ?, ?)", [username, hash, "0", username], function (err, result, fields){
                if(err){
                    if (err.code === "ER_DUP_ENTRY"){
                        result = {
                            "error": "Duplicate username"
                        };
                    }
                    // TODO: Fix this error code in schema.
                    else if(err.code === "UNKNOWN_CODE_PLEASE_REPORT"){
                        ressult = {
                            "error": "Username too short"
                        };
                    }
                    else{
                        throw err;
                    }
                }
                data(result);
            })
        })
    )
}

testUsernames = [ "alice", "bob", "charlie", "devin", "evan", "frank", "gertrude", "hank", "irene", "jason", "kevin",
	"liz", "matt", "nate", "oscar", "peter", "quincy", "rickey", "steven", "tom"]

async function generateTestUsers(){
    for (i = 0; i < testUsernames.length; i++){
        await createUser(testUsernames[i], "passwordUser"+i);
    }
    return { "Complete" : true };
}

module.exports = {
    getActor,
    getDirector,
    getGenre,
    getGenreList,
    getMovie,
    getWriter,
    createUser,
    generateTestUsers
};