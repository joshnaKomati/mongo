const usermodel=require("../model/userSchema")
const userController=require("../controller/userController")
const Joi=require("joi")
const jwt =require("jsonwebtoken")
module.exports={
    uservalidate:async(req,res,next)=>{
     const Schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        age:Joi.string().required(),
        image:Joi.optional(),
        id:Joi.optional(),
     })
     const result=Schema.validate(req.body)
     if(result.error){
        res.json({message:result.error.details[0].message})
     }else{
        next()
     }
    },
    verifytoken:async(req,res,next)=>{
      const bearHeader =req.headers['authorization']
      if(typeof bearHeader !=='undefined'){
       try {
         const data=jwt.verify(bearHeader,'secretkey')
         const result=await usermodel.findOne({email:data.email})
          if(result){
            next()
          }else{
            res.json({message:"email is not valid"})
          }
       } catch (error) {
         res.json({message:error.message})
       }
      }else{
         res.json({message:"mentioned valid token"})
      }
    }
}