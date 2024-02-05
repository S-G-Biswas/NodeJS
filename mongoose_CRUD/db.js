const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://127.0.0.1:27017/unit6");

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