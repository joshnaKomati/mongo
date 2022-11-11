const express=require("express")
const front=express()
front.get("/",(req,res)=>{
    res.render("list",{result})
})
module.exports=front