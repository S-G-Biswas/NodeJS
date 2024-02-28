const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const userRouter= express.Router()
const jwt = require("jsonwebtoken")

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: This is a unique id generated by mongo
 *        username:
 *          type: string
 *          description: The username of user
 *        email:
 *          type: string
 *          description: The email of user
 *        password:
 *         type: string
 *         description: The password of user
 */


/**
 * @swagger
 * /users/register:
 *    post:
 *      summary: For register new user
 *      tags: [Users]
 *      responses:
 *       200:
 *         description: A new user will be added
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Some Error occured
 */

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

/**
 * @swagger
 * /users/login:
 *    post:
 *      summary: For user login
 *      tags: [Users]
 *      responses:
 *       200:
 *         description: The user is logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                       type: string
 *       400:
 *         description: Some Error occured
 */

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