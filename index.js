const express=require("express")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
require("./configure/db")
const mainRouter=require("./router/index")
const front=require("./router/frontrouter")
const fileUpload=require("express-fileupload")

app.use(fileUpload())
app.use(express.static('./public/images'))
app.use("/api",mainRouter)
app.get("/",(req,res)=>{
    res.render("home")
}),
app.get("/form",(req,res)=>{
    res.render('formlist')
}),
app.set("view engine",'ejs')
app.listen(4000,()=>{
    console.log("server is working");
})
