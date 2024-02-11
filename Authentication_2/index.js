const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const cors=require("cors")
const {auth} = require("./middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json());
app.use(cors())
app.use("/users",userRouter)

//Public Routes

app.get("/", (req,res)=>{
    res.send({"msg":"This is home Route"})
})

app.get("/about",(req,res)=>{
    res.send({"msg":"This is the about page"})
})

//Restricted Routes

app.get("/movies",auth,(req,res)=>{
    // const {token} = req.query
            //Another best way
    // const token = req.headers.authorization?.split(" ")[1]
    // jwt.verify(token,"masai",(err,decoded)=>{
    //     if(decoded){
    //         console.log(decoded)
    //         res.send({"msg":"Movies Data..."})
    //     }
    //     else{
    //         res.send({"msg":"You are not authorised"})
    //     }

    // })
    
    res.send({"msg":"Movies Data..."})
})

app.get("/series",auth,(req,res)=>{
    //const {token} = req.query
     
        //Best way
    // const token = req.headers.authorization?.split(" ")[1]
    // jwt.verify(token,"masai",(err,decoded)=>{
    //     if(decoded){
    //         console.log(decoded)
    //         res.send({"msg":"Series Data..."})
    //     }
    //     else{
    //         res.send({"msg":"You are not authorised"})
    //     }

    // })  

    res.send({"msg":"Series Data..."})
   
})

app.get("/refresh",(req,res)=>{
     const refreshToken = req.headers.authorization?.split(" ")[1];
      jwt.verify(refreshToken,"school",(err,decoded)=>{
        if(decoded){
            const accessToken= jwt.sign({course:"nsd/nem"},"masai",{expiresIn:60})
            res.send({"newAccessToken":accessToken})
        }
        else{
            res.send({"msg":"Invalid Refresh Token"})
        }
      })
})



///Server connection

app.listen(process.env.port,async ()=>{
    try {
         await connection
         console.log("connected to DB")
         console.log(`Server is ruuning at port ${process.env.PORT}`);
    } catch (error) {
        console.log(error)
    }
    
})