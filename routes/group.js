const db = require('../db.js');
const router = require('express').Router();

async function confirmGroupAccess(username, group){
    // Get user's group(s)
    userGroups = await db.getGroups(username);
    userGroups = userGroups.map(r => r.group_id)
    // Compare
    if(userGroups.includes(group)) return true;
    else return false;
}

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

router.get('/:id', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.params.id)){
        result = await db.getGroupName(req.params.id);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this group."})
    }
})

router.get('/:id/members', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.params.id)){
        result = await db.getMembers(req.params.id);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this group."})
    }
})

// Create a group: creates group with name,
// retrieves ID, and adds signed-in user to group
router.post('/create', async (req, res) => {
    name = req.body.group_name;
    if (name) {
        result1 = await db.createGroup(name);
        if (result1.error) res.send(result1);
        result2 = await db.lastID();
        id = result2[0]["LAST_INSERT_ID()"];
        username = req.session.username;
        result3 = await db.addToGroup(username, id);
        res.send(result3);
    } else {
        res.send("No group name provided.");
    }
})

// Add user to group
router.post('/add', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.body.group_id)){
        name = req.body.username;
        id = req.body.group_id;
        if (name && id) {
            result = await db.addToGroup(name, id);
            res.send(result);
        } else {
            res.send("Info is missing.");
        }
    } else {
        res.send({error: "You do not have access to this group."})
    }

})

// View polls within group
router.get('/:id/polls', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.params.id)){
        result = await db.getPolls(req.params.id);
        res.send(result);
    }
    else {
        res.send({error: "You do not have access to this group."})
    }
})

// Delete a group
// Note: this does not delete its polls.
// Future code should delete entries from Poll, Choice, and vote.
router.post('/delete', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.body.group_id)){
        id = req.body.group_id;
        if (!id) res.send("Group ID is missing.");
        result1 = await db.emptyGroup(id);
        if (result1.error) res.send(result1);
        result2 = await db.deleteGroup(id);
        res.send(result2);
    }
    else{
        res.send({error: "You do not have access to this group."})
    }
})

// Remove a user from a group
router.post('/remove', async (req, res) => {
    if(confirmGroupAccess(req.session.username, req.body.group_id)){
        name = req.body.username;
        if (!name) res.send("Username is missing.");
        id = req.body.group_id;
        if (!id) res.send("Group ID is missing.");
        result = await db.removeFromGroup(name, id);
        res.send(result);
    }
    else{
        res.send({error: "You do not have access to this group."})
    }
})

module.exports = router;