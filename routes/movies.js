const db = require('../db.js');
const router = require('express').Router();

router.get('/genre', async (req, res) => {
    // Get genre(s) available
    result = await db.getGenreList();
    res.send(result.sort());
})

router.get('/director/:id', async (req, res) => {
    // Get director(s) for movie by ID
    imdb_id = req.params.id;
    result = await db.getDirector(imdb_id);
    res.send(result);
})

router.get('/writer/:id', async (req, res) => {
    // Get writer(s) for movie by ID
    imdb_id = req.params.id;
    result = await db.getWriter(imdb_id);
    res.send(result);
})

router.get('/genre/:id', async (req, res) => {
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    result = await db.getGenre(imdb_id);
    res.send(result);
})

router.get('/actor/:id', async (req, res) => {
    // Get genre(s) for movie by ID
    imdb_id = req.params.id;
    result = await db.getActor(imdb_id);
    res.send(result);
})

router.get('/:id', async (req, res) => {
    // Get movie details by ID
    imdb_id = req.params.id;
    result = await db.getMovie(imdb_id);
    if(req.query.full === "1"){
        result[0].actor = await db.getActor(imdb_id);
        result[0].director = await db.getDirector(imdb_id);
        result[0].writer = await db.getWriter(imdb_id);
        result[0].genre = await db.getGenre(imdb_id);
    }
    res.send(result);
})

module.exports = router;
