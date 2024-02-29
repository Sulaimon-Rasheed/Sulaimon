const express = require("express")

const homeRouter = express.Router()

homeRouter.get("/", (req,res)=>{
    res.status(200).render("home",
     {
        nav:["Home" , "About", "Project", "Article"],
        name: "Sulaimon Rasheed",
        home:"Home",
        image:["sul_smile.jpg","sul_sideLook.jpg", "sul_with_laptop.jpg"]
    })
})

module.exports = homeRouter