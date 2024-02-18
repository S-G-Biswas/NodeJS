const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const swaggerJsdoc = require('swagger-jsdoc');
const SwaggerUi = require("swagger-ui-express")

const app = express();
app.use(express.json());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Intro to swagger',
        version: '1.0.0',
      },
      servers:[
        {
            url:"http://localhost:8080/"
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
app.use("/apidocs",SwaggerUi.serve, SwaggerUi.setup(openapiSpecification));

//Default Routes

app.get("/", (req,res)=>{
    res.send({"msg":"This is home Route"})
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