const http = require("http")

const server= http.createServer((req,res) =>{
    req.url==="/"? res.end("This is Home Page")
        : req.url==="/about"? res.end("This is About page")
        : req.url==="/contact"? res.end("This is contact page")
        : req.url==="/login"? res.end("This is Login page")
        : res.end("404 Not Found")

})

server.listen(8080,()=>{
     console.log("server is Runnig at port 8080")
})