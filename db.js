const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { request } = require('express');
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
        db.query("SELECT writer FROM Movie_writer WHERE imdb_id = ?", imdb_id, (err, result, fields) => {
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
        db.query("SELECT director FROM Movie_director WHERE imdb_id = ?", imdb_id, (err, result, fields) => {
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
        db.query("SELECT genre FROM Movie_genre WHERE imdb_id = ?", imdb_id, (err, result, fields) => {
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
        db.query("SELECT actor FROM Movie_actor WHERE imdb_id = ?", imdb_id, (err, result, fields) => {
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
        db.query("SELECT * FROM Movie WHERE imdb_id = ?", imdb_id, (err, result, fields) => {
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
        db.query("SELECT distinct genre FROM Movie_genre", (err, result, fields) => {
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
            db.query("INSERT INTO User VALUES (?, ?, ?, ?)", [username, hash, "0", username], (err, result, fields) => {
                if(err){
                    if (err.code === "ER_DUP_ENTRY"){
                        result = {
                            "error": "Duplicate username"
                        };
                    }
                    // TODO: Fix this error code in schema.
                    else if(err.code === "UNKNOWN_CODE_PLEASE_REPORT"){
                        result = {
                            "error": "Username too short"
                        };
                    }
                    else{
                        result ={
                            "error": "Unhandled error."
                        };
                    }
                }
                data(result);
            })
        })
    )
}

async function signIn(username, password, request){
    return new Promise (data =>
        db.query("SELECT * FROM User WHERE username = ?", username, (err, result, fields) => {
            if (result.length > 0){
                // Check password
                bcrypt.compare(password, result[0].pw_hash, (err, check) => {
                    if(check){
                        // Establish session.
                        request.session.loggedin = true;
                        request.session.username = username;
                        data({
                            "success": true,
                            "profile": {
                                "username": result[0].username,
                                "display_name": result[0].display_name,
                            }
                        })
                    }
                    else{
                        // Return invalid user/pass.
                        data( {"error": "Invalid username/password."} )
                    }

                })
            }
            else{
                // Username does not exist, return invalid user/pass.
                data( {"error": "Invalid username/password."} )
            }
        })
    )
}


// TODO: Prolly should be authenticated, will simplify code a ton.
async function changePassword(username, oldPassword, newPassword){
    return new Promise (data =>
        db.query("SELECT * FROM User WHERE username = ?", username, (err, result, fields) => {
            if (result.length > 0){
                // Check password
                bcrypt.compare(oldPassword, result[0].pw_hash, (err, check) => {
                    if(check){
                        // Set new password.
                        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                            db.query("UPDATE User SET pw_hash = ?, pw_salt = 0 WHERE username = ?", [hash, username], (err, result, fields)=>{
                                data(result);
                            })
                        })
                    }
                    else{
                        // Return invalid user/pass.
                        data( {"error": "Invalid old password."} )
                    }

                })
            }
            else{
                // Username does not exist, return invalid user/pass.
                data( {"error": "Invalid username/password."} )
            }
        })
    )
}

async function changeDisplay(username, newDisplay){
    return new Promise (data =>
        db.query("UPDATE User SET display_name = ? WHERE username = ?", [newDisplay, username], (err, result, fields) => {
            if (err) data({"error": "Could not set display name."});
            data( {"success": "Set display name."} );
        })    
    )
}

async function deleteUser(username){
    return new Promise (data =>
        // Clean up user table.
        db.query("DELETE FROM User WHERE username = ?", username, (err, result, fields) => {
            if (err) data({"error": "Could not delete user from users."});
            // Clean up belong table.
            db.query("DELETE FROM belong WHERE username = ?", username, (err, result, fields) => {
                if (err) data({"error": "Could not delete user from groups."});
                data( {"success": "Completely deleted user."} );
            })
        })    
    )
}

async function getProfile(username){
    return new Promise (data =>
        db.query("SELECT username, display_name FROM User WHERE username = ?", username, (err, result, fields) => {
            if(result.length > 0){
                data(result[0])
            }
            else{
                data({"error": "Username not found."})
            }
        })
    )
}

async function getGroups(username){
    return new Promise (data =>
        db.query("SELECT u.group_id, u.group_name FROM UserGroup AS u NATURAL JOIN (SELECT * FROM belong WHERE username = ? ) AS b",
        username, (err, result, fields) =>{
            data(result);
        })    
    )
}

async function getMembers(groupID){
    return new Promise (data =>
        db.query("SELECT username FROM belong WHERE group_id = ?", groupID, (err, result, fields) => {
            result = result.map(r => r.username);
            data(result);
        })    
    )
}

async function getGroupName(groupID){
    return new Promise (data =>
        db.query("SELECT group_name FROM UserGroup WHERE group_id = ?", groupID, (err, result, fields) => {
            data(result);
        })    
    )
}

async function getPolls(groupID){
    return new Promise (data =>
        db.query("SELECT poll_id, poll_name FROM Poll WHERE group_id = ?", groupID, (err, result, fields) => {
            data(result);
        })    
    )
}

async function createGroup(group_name) {
    return new Promise (data =>
        db.query("INSERT INTO UserGroup (group_name) VALUES (?);", group_name, (err, result, fields) => {
            if (err) data({"error": "Could not create group."});
            data( {"success": "Created group."} );
        })    
    )
}

async function lastID() {
    return new Promise (data =>
        db.query("SELECT LAST_INSERT_ID();", (err, result, fields) => {
            if (err) data({"error": "Could not get ID."});
            data(result);
        })    
    )
}

async function addToGroup(username, group_id) {
    return new Promise (data =>
        db.query("INSERT INTO belong VALUES (?, ?);", [username, group_id], (err, result, fields) => {
            if (err) data({"error": "Could not add user to group."});
            data( {"success": "Added user to group."} );
        })    
    )
}

async function emptyGroup(group_id) {
    return new Promise (data =>
        db.query("DELETE FROM belong WHERE group_id = ?;", group_id, (err, result, fields) => {
            if (err) data({"error": "Could not empty group."});
            data( {"success": `Emptied group ${group_id}.`} );
        })    
    )
}

async function deleteGroup(group_id) {
    return new Promise (data =>
        db.query("DELETE FROM UserGroup WHERE group_id = ?;", group_id, (err, result, fields) => {
            if (err) data({"error": "Could not delete group."});
            data( {"success": `Deleted group ${group_id}.` } );
        })    
    )
}

async function removeFromGroup(username, group_id) {
    return new Promise (data =>
        db.query("DELETE FROM belong WHERE username = ? AND group_id = ?;", [username, group_id], (err, result, fields) => {
            if (err) data({"error": "Could not remove user from group."});
            data( {"success": `Removed ${username} from group ${group_id}.`} );
        })    
    )
}

async function createPoll(poll_name, group_id) {
    return new Promise (data =>
        db.query("INSERT INTO Poll (poll_name, group_id) VALUES (?, ?);", [poll_name, group_id], (err, result, fields) => {
            if (err) data({"error": "Could not create poll."});
            data( {"success": "Created poll."} );
        })    
    )
}

async function getPollMovies(poll_id) {
    return new Promise (data =>
        db.query("SELECT imdb_id FROM Choice WHERE poll_id = ?;", poll_id, (err, allMovieResult, fields) => {
            allMovieResult = allMovieResult.map(r => r.imdb_id);
            db.query("SELECT imdb_id FROM vote WHERE poll_id = ? AND username = ?;", [poll_id, username], (err, myMovieResult, fields) => {
                myMovieResult = myMovieResult.map(r => r.imdb_id);
                result = allMovieResult.filter(a => !myMovieResult.includes(a));
                console.log(result)
                data(result);
            })
        })
    )
}

async function getPollResults(poll_id) {
    return new Promise (data =>
        db.query("SELECT imdb_id, yes AS Likes, (total-yes) AS Dislikes, CONCAT(FORMAT(IF(total=0,0,yes*100.0/total), 2), '%') AS Percentage FROM (\
            (SELECT imdb_id, COUNT(*) AS yes FROM vote WHERE response = 1 AND poll_id = ? GROUP BY imdb_id) t1 NATURAL JOIN \
            (SELECT imdb_id, COUNT(*) AS total FROM vote WHERE poll_id = ? GROUP BY imdb_id) t2) ORDER BY Likes DESC;",
            [poll_id, poll_id], (err, result, fields) => {
            data(result);
        })    
    )
}

async function emptyPollVotes(poll_id) {
    return new Promise (data =>
        db.query("DELETE FROM vote WHERE poll_id = ?;", poll_id, (err, result, fields) => {
            if (err) data({"error": "Could not empty poll votes."});
            data( {"success": `Emptied votes from poll ${poll_id}.`} );
        })    
    )
}

async function emptyPollChoices(poll_id) {
    return new Promise (data =>
        db.query("DELETE FROM Choice WHERE poll_id = ?;", poll_id, (err, result, fields) => {
            if (err) data({"error": "Could not empty poll choices."});
            data( {"success": `Emptied choices from poll ${poll_id}.`} );
        })    
    )
}

async function deletePoll(poll_id) {
    return new Promise (data =>
        db.query("DELETE FROM Poll WHERE poll_id = ?;", poll_id, (err, result, fields) => {
            if (err) data({"error": "Could not delete poll."});
            data( {"success": `Deleted poll ${poll_id}.`} );
        })    
    )
}

async function vote(username, poll_id, imdb_id, response) {
    return new Promise (data =>
        db.query("INSERT INTO vote VALUES (?, ?, ?, ?);", [username, poll_id, imdb_id, response], (err, result, fields) => {
            if (err) {
                console.log(err);
                data({"error": "Your vote was not counted. The election has been corrupted."});
            }
            data( {"success": `You voted ${response} on movie ${imdb_id}.`} );
        })    
    )
}

async function populatePoll(poll_id, numMovies, minYear, maxYear, minRuntime, maxRuntime,
        ratingTomato, ratingMeta, ratingIMDB, ratingParent, director, writer, actor, genre) {
    return new Promise (data =>
        db.query("CALL populate_poll(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [poll_id, numMovies, minYear, maxYear, minRuntime, maxRuntime,
            ratingTomato, ratingMeta, ratingIMDB, ratingParent, director, writer, actor, genre], (err, result, fields) => {
            if (err) data({"error": "Could not populate poll."});
            data( {"success": `Populated poll ${poll_id}.`} );
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
    generateTestUsers,
    signIn,
    changePassword,
    changeDisplay,
    deleteUser,
    getProfile,
    getGroups,
    getGroupName,
    getMembers,
    getPolls,
    createGroup,
    lastID,
    addToGroup,
    emptyGroup,
    deleteGroup,
    removeFromGroup,
    createPoll,
    getPollMovies,
    getPollResults,
    emptyPollVotes,
    emptyPollChoices,
    deletePoll,
    vote,
    populatePoll
};
