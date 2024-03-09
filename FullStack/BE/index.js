const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {notesRouter} = require("./routes/note.route")
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/users",userRouter)
app.use("/notes", notesRouter)

//Public Routes

app.get("/", (req,res)=>{
    res.send({"msg":"This is home Route"})
})

app.get("/about",(req,res)=>{
    res.send({"msg":"This is the about page"})
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