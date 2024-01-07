const express = require("express")


const aboutRouter = express.Router()

aboutRouter.get("/", (req,res)=>{
    res.status(200).render("about", {
        nav:["Home", "About", "Project", "Article"],
        name: "Sulaimon Rasheed",
        home: "Home"
    })
})

module.exports = aboutRouter