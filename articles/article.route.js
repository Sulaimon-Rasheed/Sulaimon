const express = require("express");
const controller = require("./controller.article");
const auth = require("../authentication/auth");
const cookieParser = require("cookie-parser");
const articleModel = require("../models/article");
const {DateTime} = require("luxon")

const articleRouter = express.Router();

articleRouter.use("/public", express.static("public"));

articleRouter.get("/", async (req, res) => {
  const articles = await articleModel.find({ state: "published" });
  res.status(200).render("article", {
    nav: ["Home", "About", "Project", "Article"],
    name: "Sulaimon Rasheed",
    home: "Home",
    articles,
    date: new Date(),
  });
});

articleRouter.get("/publicRead/:id", controller.readArticle);
articleRouter.post("/readCount/:id", controller.readCount);

articleRouter.use(cookieParser());

articleRouter.get("/create", auth.ensureLogin, controller.getCreatePage);

articleRouter.post("/send", auth.ensureLogin, async (req, res) => {
  let rawContent = req.body.content;
  let bodyWordsArray = rawContent.split(" ");
  let count = 0;
  bodyWordsArray.forEach((word) => {
    count++;
  });
  let blogWordsCount = count;
  let readingTime = Math.round( blogWordsCount / 200);

  const titleUpperCase = req.body.title.toUpperCase()
  const time = DateTime.now().toFormat('LLL d, yyyy \'at\' HH:mm')
  const response = await controller.sendArticle({
    title: titleUpperCase,
    description: req.body.description,
    state: "draft",
    read_count: 0,
    reading_time: `${readingTime} min`,
    body: rawContent,
    drafted_timestamp:time,
    published_timestamp: 0,
  });

  if (response.code === 200) {
    res.status(200).redirect("/admin/dashboard");
  } else {
    res.status(200).redirect("/article/create");
  }
});

articleRouter.get(
  "/selfRead/:id",
  auth.ensureLogin,
  controller.readOwnersArticle
);

articleRouter.post(
  "/updateState/:id",
  auth.ensureLogin,
  controller.updateState
);
articleRouter.post(
  "/deleOneArticle/:id",
  auth.ensureLogin,
  controller.deleteArticle
);
articleRouter.post("/updateBody/:id", auth.ensureLogin, controller.updateBody);

module.exports = articleRouter;
