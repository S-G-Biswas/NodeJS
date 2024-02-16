const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const userRouter= express.Router()
const jwt = require("jsonwebtoken")

//Adding new user

userRouter.post("/register",async(req,res)=>{
   const {username,email,password}= req.body
     try {
         bcrypt.hash(password, 8, async(err, hash) => {
             if(err){
                  res.send({"error":err})
             }
             else{
               const user= new UserModel({username,email,password:hash})
               await user.save();
               res.send({"msg":"New user has been added"})
             }
         })
     } 
     catch (error) {
        res.send({"error":error})
        
     }
})

//Authenticating the existing user -->  Login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
         const user =  await UserModel.findOne({email})
         
         bcrypt.compare(password, user.password, (err, result) => {
               if(result){
                 const accessToken = jwt.sign({ userID:user._id,author:user.username }, 'masai')
                  res.send({"msg":"Login Successful",accessToken})
               }
               else{
                  res.send({"msg":"User Not Found.."})
                }
         });       
     } 
    catch (error) {
       res.send({"error":error})
       
    }
})



module.exports={
    userRouter
}