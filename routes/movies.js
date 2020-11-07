const { Router } = require('express');
const db = require('../db.js');
const router = require('express').Router();


router.get('/genre', function(req, res){
    // Get genre(s) available
    db.query("SELECT distinct genre FROM Movie_genre", function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.genre);
        res.send(result);
    })
})

router.get('/director/:id', function(req, res){
    // Get director(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT director FROM Movie_director WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.director)
        res.send(result);
    })
})

router.get('/writer/:id',function(req, res){
    // Get writer(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT writer FROM Movie_writer WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.writer)
        res.send(result);
    })
})

router.get('/genre/:id', function(req, res){
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    console.log("In genre/id")
    db.query("SELECT genre FROM Movie_genre WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.genre)
        res.send(result);
    })
})

router.get('/actor/:id', function(req, res){
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT actor FROM Movie_actor WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r.actor)
        res.send(result);
    })
})

router.get('/:id', function(req, res){
    // Get movie details by ID
    imdb_id = req.params.id;
    db.query("SELECT * FROM Movie WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        res.send(result);
    })
})

module.exports = router;
