const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    "regno":{type:String,require:true,unique:true},
    "model":{type:String},
    "color":{type:String},
    "price":{type:Number},
    "brand":{type:String}
})

// define collection name in the atlas
const car = mongoose.model('car', carSchema)
module.exports = car