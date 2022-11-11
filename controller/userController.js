const usermodel = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = {
    newuser: async (req, res) => {
        const { name, email, password, age, } = req.body
        const { image } = req.files
        const imagepath = Date.now() + '-' + image.name
        const path = `./public/images/${imagepath}`
        const passwordGenerate = await bcrypt.hash(password, 10)
        const checkEmail = await usermodel.findOne({ email })
        if (checkEmail) {
            res.json({ message: "email is already exist" })
        } else {
            image.mv(path, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    await usermodel.create({ name, email, password, age, profile: `http://localhost:4000/${imagepath}` })
                    // res.json({message:"user is added"})
                    res.redirect("/")
                }
            })
        }
    },
    userlist: async (req, res) => {
        const result = await usermodel.find()
        // res.json({message:"user list is displayed",result})
        res.render('list', { result })
    },
    userupdate: async (req, res) => {
        const { name, email, password, age, id } = req.body
        const passwordGenerate = await bcrypt.hash(password, 10)
        const checkId = await usermodel.findById(id)
        if (checkId) {
            await usermodel.findByIdAndUpdate(id, { name, email, password: passwordGenerate, age })
            // res.json({message:"user details is update"})
            res.redirect("/")
        } else {
            res.json({ message: "user details is not updated" })
        }
    },
    usergetbyid: async (req, res) => {
        const { id } = req.params
        const checkId = await usermodel.findById(id)
        if (checkId) {
            await usermodel.findByIdAndUpdate(id)
            // res.json({message:"user details get by id",checkId})
            res.render('editfile', { checkId })
        } else {
            res.json({ message: "user details does not updated by id" })
        }
    },
    userdeletebyid: async (req, res) => {
        const { id } = req.params
        const checkId = await usermodel.findById(id)
        if (checkId) {
            await usermodel.findByIdAndDelete(id)
            // res.json({message:'user details deleted by id'})
            res.redirect("/")

        } else {
            res.json({ message: "user details does not delete by id" })
        }
    },
    userLogin: async (req, res) => {
        const { email, password } = req.body
        const checkEmail = await usermodel.findOne({ email })
        if (checkEmail) {
            if (password == checkEmail.password) {
                const token = jwt.sign({ email }, 'secretkey')
                res.json({ message: "user logind", token })
            } else {
                res.json({ message: "password is wrong" })
            }
        } else {
            res.json({ message: "email is not exist" })
        }
    },

}