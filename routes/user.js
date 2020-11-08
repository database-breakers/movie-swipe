const db = require('../db.js');
const router = require('express').Router();

router.post('/createUser', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    if(username && password){
        result = await db.createUser(username, password);
        res.send(result);
    }
    else{
        res.send("No username or password provided.");
    }
})

router.post('/signin', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    if(username && password){
        result = await db.signIn(username, password, req)
        res.send(result);
    }

})

router.post('/signout', async (req, res) => {
    req.session.destroy( (err) =>{
        if (err) res.send( {"error": "Could not sign out."} );
        else res.send( {"success": true} );
    });  
})

/**
 * Restores the test user database.
 * Needed if hashing algo changes.
 * Ideally, should not be enabled in production,
 * though it will do no harm.
 */
/*
router.get('/createTestUsers', async (req, res) => {
    console.log("Adding test users.");
    result = await db.generateTestUsers();
    res.send(result);
})
*/

module.exports = router;