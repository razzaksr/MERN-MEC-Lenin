const router = require('express').Router();
const dao = require('./userdao')

// endpoints to user dao
router.post('/signup', async(req, res) => {
    const newUser = req.body;
    const created = await dao.registerUser(newUser);
    if(!created) return res.status(400).send('User already exists');
    res.status(201).send(created);
})

module.exports = router;