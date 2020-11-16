const db = require('../db.js');
const router = require('express').Router();

async function confirmPollAccess(username, poll){
    // Get poll's group
    pollGroup = await db.getGroupFromPoll(poll);
    // Get user's group(s)
    userGroups = await db.getGroups(username);
    userGroups = userGroups.map(r => r.group_id)
    // Compare
    if(userGroups.includes(pollGroup)) return true;
    else return false;
}

router.get('*', async(req, res, next) => {
    if(req.session && req.session.loggedin && req.session.username){
        next();
    }
    else{
        res.send({"error": "Sign in to access polls."})
    }
})

// Create a poll
router.post('/create', async (req, res) => {
    name = req.body.poll_name;
    if (!name){
        res.send("No poll name provided.");
        return;
    }
    group_id = req.body.group_id;
    if (!group_id){
        res.send("No group ID provided.");
        return;
    }
    result1 = await db.createPoll(name, group_id);
    if (result1.error){
        res.send(result1);
        return;
    }
    message = result1.success;
    result2 = await db.lastID();
    id = result2[0]["LAST_INSERT_ID()"];
    res.send({"success": message, "poll_id": id});
})

// View movies in a poll
router.get('/:id/movies', async (req, res) => {
    if(confirmPollAccess(req.params.id, req.session.username)){
        result = await db.getPollMovies(req.params.id, req.session.username);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

// View results of a poll
router.get('/:id/results', async (req, res) => {
    if(confirmPollAccess(req.params.id, req.session.username)){
        result = await db.getPollResults(req.params.id);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

// Delete a poll
router.post('/delete', async (req, res) => {
    if(confirmPollAccess(req.body.poll_id, req.session.username)){
        id = req.body.poll_id;
        if (!id){
            res.send("Poll ID is missing.");
            return;
        }
        result1 = await db.emptyPollVotes(id);
        if (result1.error){
            res.send(result1);
            return;
        } 
        result2 = await db.emptyPollChoices(id);
        if (result2.error){
            res.send(result2);
            return;
        }
        result3 = await db.deletePoll(id);
        res.send(result3);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

// Swipe right (vote yes)
router.post('/swipe/right', async (req, res) => {
    if(confirmPollAccess(req.body.poll_id, req.session.username)){
        username = req.session.username;
        if (!username){
            res.send("Not logged in.");
            return;
        }
        poll_id = req.body.poll_id;
        if (!poll_id){
            res.send("Poll ID is missing.");
            return;
        }
        imdb_id = req.body.imdb_id;
        if (!imdb_id){
            res.send("IMDB ID is missing.");
            return;
        }
        result = await db.vote(username, poll_id, imdb_id, 1);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

// Swipe left (vote no)
router.post('/swipe/left', async (req, res) => {
    if(confirmPollAccess(req.body.poll_id, req.session.username)){
        username = req.session.username;
        if (!username){
            console.log("Not signed in.")
            res.send("Not logged in.");
            return;
        }
        poll_id = req.body.poll_id;
        if (!poll_id){
            console.log("No poll specified.")
            res.send("Poll ID is missing.");
            return;
        }
        imdb_id = req.body.imdb_id;
        if (!imdb_id){
            console.log("No movie ID")
            res.send("IMDB ID is missing.");
            return;
        }
        result = await db.vote(username, poll_id, imdb_id, 0);
        console.log(result);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

// Filter movies and populate poll
// Example POST body:
/*
{
    "poll_id": 39,
    "numMovies": 6,
    "minYear": null,
    "maxYear": null,
    "minRuntime": null,
    "maxRuntime": null,
    "ratingTomato": null,
    "ratingMeta": null,
    "ratingIMDB": 8.0,
    "ratingParent": null,
    "director": "Christopher Nolan",
    "writer": null,
    "actor": null,
    "genre": null
}
*/
router.post('/populate', async (req, res) => {
    poll_id = req.body.poll_id;
    if(confirmPollAccess(poll_id, req.session.username)){
        if (!poll_id) res.send("Poll ID is missing.");
        numMovies = req.body.numMovies;
        minYear = req.body.minYear;
        maxYear = req.body.maxYear;
        minRuntime = req.body.minRuntime;
        maxRuntime = req.body.maxRuntime;
        ratingTomato = req.body.ratingTomato;
        ratingMeta = req.body.ratingMeta;
        ratingIMDB = req.body.ratingIMDB;
        ratingParent = req.body.ratingParent;
        director = req.body.director;
        writer = req.body.writer;
        actor = req.body.actor;
        genre = req.body.genre;
        result = await db.populatePoll(poll_id, numMovies, minYear, maxYear, minRuntime, maxRuntime,
                ratingTomato, ratingMeta, ratingIMDB, ratingParent, director, writer, actor, genre);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this poll."})
    }
})

module.exports = router;
