const express= require("express");
const { connection } = require("./Schema/connection");
const { User } = require("./Schema/Users");
const { Posts } = require("./Schema/Posts");
const app = express();
app.use(express.json());

//Routes

app.get("/home",(req,res)=>{
     res.status(200).json({
        isError: false,
        msg:"All Ok",
     });
});


//Get User
app.get("/users",async(req,res) => {
   const data = await User.findAll();
   res.status(200).json({
    isError:false,
    data,
   });
});

//Add User
app.post("/users", async(req,res) =>{
   const {name,address,age,phone} = req.body;

   const data = await User.create({
      name,
      address,
      age,
      phone,
   });
   res.status(200).json({
    isError:false,
    data,
   });
});

// Update User
app.patch("/users/:id", async(req,res) =>{
    
    const {id} = req.params;
    const updation = req.body;

    const data = await User.update(
        {
            ...updation,
        },
        {
          where:{id:req.params.id},
        }
    );

    res.status(200).json({
     isError:false,
     data,
    });
 });

 //Delete User
 app.delete("/users/:id", async(req,res) =>{
    
    await User.destroy({
        where:{
            id: req.params.id,
        },
    });

    res.status(200).json({
     isError:false,
     data,
    });
 });


 //Posts

 //Get Post using join
 app.get("/posts",async(req,res) => {
    User.hasMany(Posts,{foreignKey:"userID"});
    Posts.belongsTo(User,{foreignKey:"userID"});

    const data = await User.findAll({
        include:[User],
    });
    res.status(200).json({
     isError:false,
     data,
    });
 });

 
 //Post Posts
 app.post("/posts", async(req,res) =>{
    const {content,image,userID} = req.body;
 
    const data = await Posts.create({
       content,
       image,
       userID,
    });
    res.status(200).json({
     isError:false,
     data,
    });
 });


//Connection
// sequelize.sync().then (() =>{
//     app.listen(3001,()=>{
//         console.log("server started");
//     });
// });

app.listen(3001,() =>{
    console.log("Running at 3001");
})

