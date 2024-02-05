const  express = require("express");
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")

const app = express();
app.use(express.json())
app.use("/users",userRouter)

app.get("/", (req,res)=>{
  res.header("Content-type","text/html")
  res.send("<h1>This is Home Page</h1>")  
  
  //res.send({"msg":"This is home Page"})
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