// import config in order to enable the .env communication
require('dotenv').config()
const mongoose = require('mongoose')

const establish = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected!!!!!!!')
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}
module.exports = establish