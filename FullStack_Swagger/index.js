const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {notesRouter} = require("./routes/note.route")
const swaggerJsdoc = require('swagger-jsdoc');
const SwaggerUi = require("swagger-ui-express")

const app = express();
app.use(express.json());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Full Stack Swagger',
        version: '1.0.0',
      },
      servers:[
        {
            url:"http://localhost:4500/"
        },
        {
            url:"http://www.example.com"
        }
      ]
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};
  
  const openapiSpecification = swaggerJsdoc(options);

app.use("/users",userRouter)
app.use("/notes", notesRouter)

app.use("/apidocs",SwaggerUi.serve, SwaggerUi.setup(openapiSpecification));


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