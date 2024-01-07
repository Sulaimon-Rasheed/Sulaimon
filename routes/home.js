const express = require("express")

const homeRouter = express.Router()

homeRouter.get("/", (req,res)=>{
    res.status(200).render("home",
     {
        nav:["Home" , "About", "Project", "Article"],
        name: "Sulaimon Rasheed",
        home:"Home",
        image:["sulaimon9_image.jpg","sulaimon7_image.jpg", "sulaimon8-teach_image.jpg"]
    })
})

module.exports = homeRouter