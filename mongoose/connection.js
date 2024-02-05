const mongoose = require("mongoose");

const main= async() =>{
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/unit6")
        //Add Data
        
        // UserModel.insertMany([{name:"sgb",age:34,is_Married:false,city:"bhilai"}])
        
        // Adding data better way

        // const user = new UserModel({
        //     name:"SGB",
        //     age:24,
        //     is_Married:false,
        //     city:"Raipur"
        // })
        // user.save()

        // Get the data from db
 
        const users = await UserModel.find()
        console.log(users)

       console.log("connected to the DB");
    } 
    catch (error) {
        console.log(error)
        
    }
} 

main();

//Structuring DB

//1.creating schema

const userSchema = mongoose.Schema({
    name:String,
    age:Number,
    is_Married:Boolean,
    city:String
} ,{
    versionKey:false
})

//2. Model
const UserModel = mongoose.model('user',userSchema);