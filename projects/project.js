const express = require("express")

const projectRouter = express.Router()


projectRouter.get("/", (req,res)=>{
    res.status(200).render("project", 
    {
        nav:["Home" , "About", "Project", "Article"],
        name: "Sulaimon Rasheed",
        home:"Home"
    })
})

module.exports = projectRouter