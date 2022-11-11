const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/crude",()=>{
    console.log("db is conneted");
})