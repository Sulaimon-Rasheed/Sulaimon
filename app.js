const express = require("express")
const fsPromises = require("fs").promises
require("dotenv").config()
const db = require("./config/mongoose")
const bodyParser = require("body-parser")
const adminRoute = require("./admin/admin.route")



const homeRoute = require("./routes/home.js")
const aboutRoute = require("./routes/about.js")
const projectRoute = require("./projects/project")
const articleRoute = require("./articles/article.route")

const PORT = process.env.PORT

const app = express()
db.connectToMongoDB()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:"false"}))

app.use("/home", homeRoute)
app.use("/about", aboutRoute)
app.use("/project", projectRoute)
app.use("/article", articleRoute)
app.use("/admin", adminRoute)
app.use('/public', express.static('public'));

app.get("/", (req,res)=>{
    res.status(200).render("home", {
        nav: ["Home" , "About", "Project", "Article"],
        name: "Sulaimon Rasheed",
        home: "Home",
        image:["sul_sideLook.jpg","sul_smile.jpg", "sulaimon8-teach_image.jpg"]
    })
})

app.get("/logout", (req,res)=>{
    res.clearCookie("jwt")
    res.redirect("/home")
})
app.get("*", async (req,res, next)=>{
    try{
        const noFile = await fsPromises.readFile("noFile")
        res.render(noFile)  
    }catch(error){
        error.type = "Redirect"
        next(error)
    }
})

app.use((error,req, res, next)=>{
    if(error.type == "Redirect"){
        res.status(303).render("error")
    }
    next()
})


app.listen(PORT, (req, res)=>{
    console.log(`Server has started running at http://localhost:${PORT}`)
})