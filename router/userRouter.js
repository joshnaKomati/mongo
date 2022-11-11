const express=require("express")
const usermodel=require("../model/userSchema")
const userController=require("../controller/userController")
const {uservalidate}=require("../middleware/user")
const userRouter=express()
userRouter.post("/add",uservalidate,userController.newuser)
userRouter.get("/list",userController.userlist)
userRouter.post("/update",uservalidate,userController.userupdate)
userRouter.get("/get/:id",userController.usergetbyid)
userRouter.get("/delete/:id",userController.userdeletebyid)
userRouter.post('/logins',userController.userLogin)
module.exports=userRouter