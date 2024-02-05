const  express = require("express");
const {connection,UserModel} = require("./db")
const app = express();
app.use(express.json())

app.get("/", (req,res)=>{
    res.send({"msg":"This is home Page"})
})

// Adding new user

app.post("/users",async(req,res)=>{ 
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
app.get("/users",async(req,res)=>{ 
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

app.patch("/users/:userID",async(req,res)=>{ 
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

app.patch("/users/:userID",async(req,res)=>{ 
    const {userID} = req.params

    try {
      await UserModel.findByIdAndDelete({_id:userID}, req.body)
      res.status(200).send({"msg":"the users is Deleted"})
   } 
   catch (error) {
     res.status(400).send({"error":error})
   }
})




app.listen(4500,async()=>{
    try {
        await connection
        console.log("server is running at 4500")
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    
})