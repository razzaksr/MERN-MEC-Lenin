const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const carSchema = mongoose.Schema({
    "regno":{type:String,require:true,unique:true},
    "model":{type:String},
    "color":{type:String},
    "price":{type:Number},
    "brand":{type:String}
})

const userSchema = mongoose.Schema({
    "username":{type:String,require:true,unique:true},
    "fullname":{type:String},
    "password":{type:String,require:true},
    "role":{type:String,enum:['officials','customer'],default:'officials'}
})

// called whenever you save a user document espcially changing password
// it needs to be encoded with 12 chars
userSchema.pre('save', async function(){
    if(!this.isModified('password'))return 
    const salted = await bcrypt.genSalt(12)
    this.password = await bcrypt.hashSync(this.password,salted)
})

// define collection name in the atlas
const car = mongoose.model('car', carSchema)
const user = mongoose.model('user', userSchema)
module.exports = { car, user }