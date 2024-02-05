const express = require("express");

const app = express();



//API for movie

app.get("/", (req, res)=>{
    res.send({"msg":"This is the home page"});
})

app.get("/search", (req, res) =>{
     const {movie} = req.query
     
     if(movie){
        res.send({"msg":`Here is the details for ${movie}`})
     }
     else{
        res.send({"msg":"Please provide a movie name"}) 
     }
})

// API for Weather

app.get("/", (req, res)=>{
    res.send({"msg":"This is the home page"});
})

app.get("/weather", (req, res) =>{
     const {city} = req.query
     
     if(city){
        res.send({"msg":`The temperature in ${city} is 29^C`})
     }
     else{
        res.send({"msg":"Please provide a city name"}) 
     }
})




app.listen(8080, () =>{
    console.log("Server started on port 8080");
})



