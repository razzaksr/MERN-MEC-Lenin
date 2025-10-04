const jwt = require('jsonwebtoken')
const {user} = require('./model')
const bcrypt = require('bcryptjs')

// register new user
const registerUser = async(newUser) => {
    const existing = await user.findOne({username:newUser.username})
    if(existing) return null
    const created = new user(newUser)
    await created.save()
    return created
}

module.exports = { registerUser }


