const { user } = require("./model")
const jwt = require('jsonwebtoken')
const tokenVerification = async(req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token)
        res.status(401).json({error:"unauthorized/ token not found"})
    try{
        const received = jwt.verify(token,process.env.SECRET_KEY)
        console.log(JSON.stringify(received))
        // since const token = jwt.sign({"logged":username},process.env.SECRET_KEY,{expiresIn:'1hr'})
        // i have to use received.logged
        // we are trying to find who has logged beacuse we need to perform role based authentication
        // once logged person found we are storing in 'req.user' as custom property which can be used in roleVerification
        req.user = await user.findOne({username:received.logged}).select("-password")
        next()
    }catch(err){
        res.status(403).json({error:`Forbidden`})
    }
}

const roleVerification = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};

module.exports = {tokenVerification,roleVerification}