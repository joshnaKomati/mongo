const mongoose=require("mongoose")
const usermodel=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    profile:String

})
module.exports=new mongoose.model("user",usermodel)