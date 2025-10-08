const jwt = require('jsonwebtoken')
const {user} = require('./model')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// register new user
const registerUser = async(newUser) => {
    const existing = await user.findOne({username:newUser.username})
    if(existing) return null
    const created = new user(newUser)
    await created.save()
    return created
}

const logginIn = async(obj) => {
    const{username,password} = obj
    const exists = await user.findOne({username})
    if(!exists || !(await bcrypt.compare(password,exists.password)))
        return null
    const token = jwt.sign({"logged":username},process.env.SECRET_KEY,{expiresIn:'1hr'})
    return token
}

module.exports = { registerUser, logginIn }


