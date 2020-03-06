const db = require("../app/db.js");
const Comment = db.comment;
const User = db.user;
const Article = db.article;
const asyncMiddleware = require("express-async-handler");

exports.addComment = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> addComment");
  await Comment.create({
    content: req.body.content,
    status: true,
    user_id: req.userId,
    article_id: req.params.id
  });
  if (res.status(201)) {
    res.status(201).send({
      status: "Comment added!"
    });
  } else {
    res.send({ error: error });
  }
});

exports.updateCommentStatus = asyncMiddleware(async (req, res) => {
  await Comment.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );
  if (res.status(200)) {
    res.status(200).json({ msg: "Comment updated!" });
  } else {
    res.send({ error });
  }
});

exports.getAllComments = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  if (res.status(200)) {
    res.status(200).send(comment);
  } else {
    res.send({ error: error });
  }
});

exports.getCommentsByArticleId = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Comment,
        attributes: ["id", "content", "status"],
        include: [
          {
            model: User,
            attributes: ["name"]
          }
        ]
      }
    ]
  });
  if (res.status(200)) {
    res.status(200).send(article[0].comments);
  } else {
    res.send({ error: error });
  }
});

exports.deleteComment = asyncMiddleware(async (req, res) => {
  const comment = await Comment.destroy({
    where: { id: req.params.id }
  });
  if (!comment) {
    return res.status(404).send({
      msg: "Comment Not Found!"
    });
  }
  if (res.status(200)) {
    res.status(200).json({
      msg: "Comment has been deleted!"
    });
  } else {
    res.send({ error });
  }
});
