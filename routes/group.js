const db = require('../db.js');
const router = require('express').Router();

router.get('*', async(req, res, next) => {
    if(req.session && req.session.loggedin && req.session.username){
        next();
    }
    else{
        res.send({"error": "Sign in to access groups."})
    }
})

router.get('/', async (req, res) => {
    result = await db.getGroups(req.session.username);
    res.send(result);
})

module.exports = router;