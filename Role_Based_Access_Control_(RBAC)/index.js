const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const cors=require("cors")
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

app.get("/movies",(req,res)=>{
    const {token} = req.query
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            console.log(decoded)
            res.send({"msg":"Movies Data..."})
        }
        else{
            res.send({"msg":"You are not authorised"})
        }

    })    
})

app.get("/series",(req,res)=>{
    const {token} = req.query

    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            console.log(decoded)
            res.send({"msg":"Series Data..."})
        }
        else{
            res.send({"msg":"You are not authorised"})
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