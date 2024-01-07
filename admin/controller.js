const adminModel = require("../models/admin")
const articleModel = require("../models/article")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const login = async ({admin_name, password})=>{
const info = {admin_name, password}
const approvedAdmin = await adminModel.findOne({admin_name:"Sulaimon"})
if(!approvedAdmin){
    return{
        code:404,
        message:"You are not an admin"
    }
}

const validPassword = approvedAdmin.isValidPassword(info.password)
if(!validPassword){
    return{
        code:422,
        message:"admin name or password is incorrrect"
    }
}

const token = jwt.sign({_id:approvedAdmin._id, admin_name:approvedAdmin.admin_name},process.env.JWT_SECRET, {expiresIn:"1h"})
return{
    code:200,
    message:"successful login",
    token,
    approvedAdmin
}
}

const openDashboard = async (req,res)=>{

const articles = await articleModel.find({})

    res.render("dashboard", {
        nav:["Home","About","Project","Article","Logout"],
        name:"Suaimon Rasheed",
        home:"Home",
        date:new Date(),
        articles,
        user:res.locals.user
    })
}

module.exports = {login, openDashboard}