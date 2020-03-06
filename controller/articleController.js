const db = require("../app/db.js");
const Article = db.article;
const User = db.user;
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

exports.addArticle = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> addArticle");
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    status: true,
    user_id: req.userId
  });
  if (res.status(201)) {
    res.status(201).send({
      status: "New article has been added!"
    });
  } else {
    res.send({ error: error });
  }
});

exports.getAllArticles = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  if (res.status(200)) {
    res.status(200).send({ article });
  } else {
    res.send({ error: error });
  }
});

exports.getArticleById = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Comment,
        attributes: ["content"],
        include: [
          {
            model: User,
            attributes: ["name"]
          }
        ]
      },
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  if (res.status(200)) {
    res.status(200).send({ article });
  } else {
    res.send({ error: error });
  }
});

exports.getArticleByUserId = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { user_id: req.params.id },
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  if (res.status(200)) {
    res.status(200).send({ article });
  } else {
    res.send({ error: error });
  }
});

exports.updateStatus = asyncMiddleware(async (req, res) => {
  // Updating an article
  console.log("Processing func -> update");
  await Article.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );
  if (res.status(201)) {
    res.status(201).send({
      status: "An article has been deployed!"
    });
  } else {
    res.send({ error });
  }
});

exports.deleteArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.destroy({
    where: { id: req.params.id }
  });
  if (!article) {
    return res.status(404).send({
      msg: "Article Not Found!"
    });
  }
  if (res.status(200)) {
    res.status(200).json({
      msg: "Article has been deleted!"
    });
  } else {
    res.send({ error });
  }
});

exports.searchArticle = asyncMiddleware(async (req, res) => {
  let key = ["title", "createdAt"];
  const article = await Article.findAll({
    where: {
      title: {
        [Op.like]: req.params.value
      }
    },
    include: {
      model: User,
      attribute: ["name"],
      through: ["user_id", "id"]
    }
  });
  if (res.status(200)) {
    res.status(200).send({ article });
  } else {
    res.send({ error: error });
  }
});
