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
        else{
            req.session = null;
            res.send( {"success": true} );
        }
    });  
})

router.post('/changepassword', async (req, res) => {
    username = req.body.username;
    oldPassword = req.body.oldpassword;
    newPassword = req.body.newpassword;
    if(username && oldPassword && newPassword){
        result = await db.changePassword(username, oldPassword, newPassword)
        res.send(result);
    }

})

router.post('/changedisplay', async (req, res) => {
    username = req.session.username;
    newDisplay = req.body.displayname;
    if(req.session.username && req.session.loggedin){
        result = await db.changeDisplay(username, newDisplay)
        res.send(result);
    }

})

router.post('/deletecurrentuser', async (req, res) => {
    // We should lock this up more...
    // CSRF?
    username = req.session.username;
    if(req.session.username && req.session.loggedin){
        result = await db.deleteUser(username)
        res.send(result);
    }

})

router.get('/profile', async (req, res) => {
    if(req.session && req.session.loggedin && req.session.username){
        result = await db.getProfile(req.session.username);
        res.send(result);
    }
    else{
        res.send({"error": "Sign in to access profile."})
    }  
})

router.get('/profile/:username', async (req, res) => {
    if(req.session && req.session.loggedin && req.session.username){
        result = await db.getProfile(req.params.username);
        res.send(result);
    }
    else{
        res.send({"error": "Sign in to access profile."})
    }  
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