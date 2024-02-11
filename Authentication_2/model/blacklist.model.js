const mongoose =require("mongoose")

const blacklistSchema=mongoose.Schema({
    blacklistToken :{type:String,required:true}
},{
    versionKey:false
})

const BlackListModel =  mongoose.model('blacklisttoken',blacklistSchema)

module.exports={
   BlackListModel
}