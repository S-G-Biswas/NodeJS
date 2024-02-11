const jwt = require("jsonwebtoken")
const {blacklist} = require("../blacklist")

const auth =(req,res,next) =>{
  const token =req.headers.authorization?.split(" ")[1]
    if(blacklist.includes(token)){
        res.send({"msg":"You have been logged out, please login again..!"})
    }
  jwt.verify(token,"masai",(err,decoded)=>{
    if(decoded){
        next()
    }
    else{
        res.send({"msg":"You are not authorised","error":err})
    }

  })
}

module.exports={
    auth
}