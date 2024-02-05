const {UserModel} = require("../model/user.model")
const express = require("express")

const userRouter = express.Router()
// Adding new user

userRouter.post("/",async(req,res)=>{ 
    try {
    const user =UserModel(req.body)
    await user.save() 
    res.status(200).send({"msg":"The user has been added"})
   } 
   catch (error) {
     res.status(400).send({"error":error})
   }
})

// Getting users
userRouter.get("/",async(req,res)=>{ 
    try {
    const  users=await UserModel.find()

    //filtering user
    // const  users=await UserModel.find(req.query) // req.query = {"city" = "delhi"}
    res.status(200).send({"msg":"All users data received",users})
   } 
   catch (error) {
     res.status(400).send({"error":error})
   }
})

// update users

userRouter.patch("/:userID",async(req,res)=>{ 
    const {userID} = req.params

    try {
      await UserModel.findByIdAndUpdate({_id:userID}, req.body)
      res.status(200).send({"msg":"the users is Updated"})
   } 
   catch (error) {
     res.status(400).send({"error":error})
   }
})

// Delete user

userRouter.patch("/:userID",async(req,res)=>{ 
    const {userID} = req.params

    try {
      await UserModel.findByIdAndDelete({_id:userID}, req.body)
      res.status(200).send({"msg":"the users is Deleted"})
   } 
   catch (error) {
     res.status(400).send({"error":error})
   }
})

module.exports={
    userRouter
}