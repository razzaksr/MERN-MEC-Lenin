const router = require('express').Router();
const dao = require('./userdao')

// endpoints to user dao
router.post('/signup', async(req, res) => {
    const newUser = req.body;
    const created = await dao.registerUser(newUser);
    if(!created) return res.status(400).send('User already exists');
    res.status(201).send(created);
})

// signin
router.post('/signin',async(req,res)=>{
    const returned = await dao.logginIn(req.body)
    if(!returned)
        res.status(401).json({error:`${req.body.username} unauthorized`})
    res.status(200).json({message:returned})
})

module.exports = router;