
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required: true}
},{
    versionKey:false
})

const UserModel = mongoose.model("notesapp",userSchema)

module.exports={
    UserModel
}