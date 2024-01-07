const express = require ("express")
const controller = require("./controller")
const cookieParser = require("cookie-parser")
const adminModel = require("../models/admin")
const auth = require("../authentication/auth")


const adminRouter = express.Router()



// Creating an Admin
adminRouter.post("/signup", (req,res)=>{
    const admin = req.body
    adminModel.create(admin)
    .then((admin)=>{
      return res.json({
        message:"admin created successfully",
        admin
       }) 
    })
    .catch((err)=>{
        res.json({
            message:err.message
        })
    })
})

// Getting to the login Page
adminRouter.get("/login", (req,res)=>{
   res.status(200).render("login", 
   {
    nav:["Home", "About"],
    name: "Sulaimon Rasheed",
    home:"Home"
})

})



adminRouter.use(cookieParser())
//Logging in users
adminRouter.post("/login", async(req,res)=>{
    const response = await controller.login({admin_name:req.body.admin_name, password:req.body.password})
    if(response.code === 200){
        res.cookie("jwt", response.token, {maxAge:60 * 60 * 1000})
        res.redirect("/admin/dashboard")
    }else if(response.code === 404){      
        res.redirect("/notAdmin")
    }else if(response.code === 422){
        res.redirect("/invalidInfo")     
    }else{
        res.redirect("/serverError")
    }
})

adminRouter.get("/dashboard", auth.ensureLogin, controller.openDashboard)

module.exports = adminRouter