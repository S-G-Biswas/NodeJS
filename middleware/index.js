const express = require("express");

const app = express();

app.use((req,res,next) =>{
    console.log(`The Time is :- ${new Date()} and method is :- ${req.method}`);
})

app.get("/",(req, res) =>{
     res.send({"msg":"This is home Page"});
})

app.get("/about",(req, res) =>{
    res.send({"msg":"This is About Page"});
})

app.get("/contact",(req, res) =>{
    res.send({"msg":"This is contact Page"});
})

app.listen(8080,() =>{
    console.log("Server started in port 8080");
})