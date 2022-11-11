const express=require("express")
const front=express()
front.get("/",(req,res)=>{
    res.render("list",{result})
    res.json({message:"its working"})
})
module.exports=front