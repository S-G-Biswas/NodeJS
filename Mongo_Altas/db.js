const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoURL);

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={
    connection,
    UserModel
}