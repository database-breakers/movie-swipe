const { Router } = require('express');
const db = require('../db.js');
const router = require('express').Router();

router.route('/:id').get(function(req, res){
    // Get movie details by ID
    imdb_id = req.params.id;
    db.query("SELECT * FROM Movie WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        res.send(result);
    })
})

router.route('/director/:id').get(function(req, res){
    // Get director(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT director FROM Movie_director WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r["director"])
        res.send(result);
    })
})

router.route('/writer/:id').get(function(req, res){
    // Get writer(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT writer FROM Movie_writer WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r["writer"])
        res.send(result);
    })
})

router.route('/genre/:id').get(function(req, res){
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT genre FROM Movie_genre WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r["genre"])
        res.send(result);
    })
})

router.route('/actor/:id').get(function(req, res){
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    db.query("SELECT actor FROM Movie_actor WHERE imdb_id = ?", imdb_id, function (err, result, fields){
        if (err) throw err;
        result = result.map(r => r["actor"])
        res.send(result);
    })
})


module.exports = router;