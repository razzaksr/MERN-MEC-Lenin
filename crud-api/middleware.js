const { user } = require("./model")
const jwt = require('jsonwebtoken')
const tokenVerification = async(req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token)
        res.status(401).json({error:"unauthorized/ token not found"})
    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY)
        const foundUser = await user.findOne({username:payload.username}).select("-password")
        next()
    }catch(err){
        res.status(403).json({error:`Forbidden`})
    }
}

module.exports = {tokenVerification}