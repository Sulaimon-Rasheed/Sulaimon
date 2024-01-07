const articleModel = require("../models/article")
const {DateTime} = require("luxon")

const getCreatePage = (req,res)=>{
res.status(200).render("createPage",
{
    nav:["Home","About","Project","Article","Logout",],
    name:"Suaimon Rasheed",
    home:"Home",
    date:new Date(),
    user:res.locals.user
}
)
}

const sendArticle = async (
    {
        title, 
        description,
        state,
        read_count,
        reading_time,
        body,
        drafted_timestamp,
        published_timestamp,
   }
)=>{
    const articleInfo = {
        title, 
        description,
        state,
        read_count,
        reading_time,
        body,
        drafted_timestamp,
        published_timestamp,
    };
      if (!articleInfo) {
        return {
          message: "invalid info.",
          code: 422,
        };
      }
    
      const article = await articleModel.create({
        title:articleInfo.title,
        description:articleInfo.title,
        state:articleInfo.state,
        read_count:articleInfo.read_count,
        reading_time:articleInfo.reading_time,
        body:articleInfo.body,
        drafted_timestamp:articleInfo.drafted_timestamp,
        published_timestamp:articleInfo.published_timestamp,

      });
      return {
        message: "Blog successfully created",
        code: 200,
        article,
      };
}

const readOwnersArticle = async (req,res)=>{
  const id = req.params.id
  const article = await articleModel.findOne({_id:id})
  res.render("dashboardArticle",{
    nav:["Home","About","Project","Article","Logout"],
    name:"Sulaimon Rasheed",
    home:"Home",
    article,
    date:new Date(),
    user:res.locals.user
  })
}

const readArticle = async (req,res)=>{
  const id = req.params.id
  const article = await articleModel.findOne({_id:id})
  res.render("singleArticle",{
    article,
    name:"Sulaimon Rasheed",
    home:"Home"
  })
}

const updateState = (req, res) => {
  const id = req.params.id
  const update = req.body
  update.published_timestamp = DateTime.now().toFormat('LLL d, yyyy \'at\' HH:mm')
  articleModel.findByIdAndUpdate(id,{state:update.state, published_timestamp:update.published_timestamp} , { new: true })
      .then(newState => {
        res.redirect("/admin/dashboard")
      }).catch(err => {
          console.log(err)
          res.status(500).send(err)
      })
};

const readCount = async (req,res)=>{
  const id = req.params.id
  const update = req.body.readCount
  await articleModel.findByIdAndUpdate(id, {read_count:update})
  res.redirect("/article")
  }

  const updateBody = (req, res) => {
    const id = req.params.id
    const rawContent = req.body.content
    let readTime = req.body.reading_time
     let updateArray = rawContent.split(" ")
     let count = 0
     updateArray.forEach(word=>{
      count++
     })
     let blogWordsCount = count
     console.log(blogWordsCount )
     readTime = Math.round(blogWordsCount / 200)
     articleModel.findByIdAndUpdate({_id:id}, {body:rawContent,reading_time:`${readTime} min`}, { new: true })
        .then(() => {
          res.redirect("/admin/dashboard")
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
  };
  
  
  // Deleting of articles
  const deleteArticle = (req, res) => {
    const id = req.params.id
    articleModel.deleteOne({_id:id})
      .then(() => {
          res.redirect("/admin/dashboard")
      }).catch(err => {
          res.status(500).send(err.message)
      })
  }
  

module.exports = {getCreatePage,
   sendArticle, 
   readOwnersArticle, 
   updateState, 
   readArticle,  
   readCount,
   updateBody,
   deleteArticle
  }