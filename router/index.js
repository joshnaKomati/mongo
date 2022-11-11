const express=require("express")
const userRouter=require("./userRouter")
const mainRouter=express()
mainRouter.use("/user",userRouter)
module.exports=mainRouter